/**
 * Custom Playwright Performance Reporter
 * Tracks test execution times and identifies slow tests
 */
class PerformanceReporter {
  constructor(options = {}) {
    this.slowTestThreshold = options.slowTestThreshold || 5000; // 5 seconds
    this.testTimes = new Map();
    this.slowTests = [];
  }

  onBegin(config, suite) {
    console.log(`\n🚀 Starting ${suite.allTests().length} tests with ${config.workers} workers`);
    this.startTime = Date.now();
  }

  onTestBegin(test) {
    this.testTimes.set(test.id, Date.now());
  }

  onTestEnd(test, result) {
    const startTime = this.testTimes.get(test.id);
    const duration = Date.now() - startTime;
    
    if (duration > this.slowTestThreshold) {
      this.slowTests.push({
        title: test.title,
        file: test.location.file,
        duration: duration,
        status: result.status
      });
    }
  }

  onEnd(result) {
    const totalTime = Date.now() - this.startTime;
    
    console.log(`\n⚡ Performance Summary:`);
    console.log(`   Total time: ${(totalTime / 1000).toFixed(2)}s`);
    console.log(`   Tests passed: ${result.passed}`);
    console.log(`   Tests failed: ${result.failed}`);
    console.log(`   Average time per test: ${(totalTime / (result.passed + result.failed)).toFixed(0)}ms`);
    
    if (this.slowTests.length > 0) {
      console.log(`\n🐌 Slow tests (>${this.slowTestThreshold}ms):`);
      this.slowTests
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 10) // Top 10 slowest
        .forEach(test => {
          console.log(`   ${(test.duration / 1000).toFixed(2)}s - ${test.title} (${test.file})`);
        });
    }
    
    // Performance recommendations
    if (this.slowTests.length > 5) {
      console.log(`\n💡 Performance Tips:`);
      console.log(`   - Consider breaking down slow tests into smaller units`);
      console.log(`   - Use page.waitForLoadState() instead of arbitrary waits`);
      console.log(`   - Optimize selectors and reduce DOM queries`);
    }
  }
}

module.exports = PerformanceReporter;
