#!/usr/bin/env node

/**
 * Contentful Setup Script for Navi.com Corporate Website
 * Phase 2: Content Architecture & CMS Setup
 * 
 * This script sets up Contentful content models based on the PRD requirements
 * for 10 core page templates and supporting components.
 */

const contentful = require('contentful-management');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   CONTENTFUL_SPACE_ID');
  console.error('   CONTENTFUL_MANAGEMENT_TOKEN');
  console.error('\nPlease add these to your .env.local file');
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: MANAGEMENT_TOKEN,
});

async function setupContentful() {
  try {
    console.log('🚀 Starting Contentful setup for Navi.com...\n');

    // Get the space
    const space = await client.getSpace(SPACE_ID);
    console.log(`✅ Connected to space: ${space.name}`);

    // Get the environment (default is 'master')
    const environment = await space.getEnvironment('master');
    console.log('✅ Connected to master environment');

    // Load content models
    const contentModelsPath = path.join(__dirname, '../contentful/content-models.json');
    const contentModels = JSON.parse(fs.readFileSync(contentModelsPath, 'utf8'));

    console.log(`\n📋 Setting up ${contentModels.contentTypes.length} content models...\n`);

    // Create content types
    for (const contentType of contentModels.contentTypes) {
      try {
        console.log(`⏳ Creating content type: ${contentType.name}`);
        
        // Check if content type already exists
        let existingContentType;
        try {
          existingContentType = await environment.getContentType(contentType.sys.id);
          console.log(`   ⚠️  Content type '${contentType.name}' already exists, updating...`);
          
          // Update existing content type
          existingContentType.name = contentType.name;
          existingContentType.description = contentType.description;
          existingContentType.displayField = contentType.displayField;
          existingContentType.fields = contentType.fields;
          
          const updatedContentType = await existingContentType.update();
          await updatedContentType.publish();
          console.log(`   ✅ Updated and published: ${contentType.name}`);
          
        } catch (error) {
          if (error.name === 'NotFound') {
            // Create new content type
            const newContentType = await environment.createContentTypeWithId(contentType.sys.id, {
              name: contentType.name,
              description: contentType.description,
              displayField: contentType.displayField,
              fields: contentType.fields,
            });
            
            await newContentType.publish();
            console.log(`   ✅ Created and published: ${contentType.name}`);
          } else {
            throw error;
          }
        }
        
      } catch (error) {
        console.error(`   ❌ Error with content type '${contentType.name}':`, error.message);
      }
    }

    console.log('\n🎉 Contentful setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Add content entries in Contentful web interface');
    console.log('   2. Configure webhooks for build triggers');
    console.log('   3. Test content delivery API integration');
    console.log('   4. Set up preview mode for draft content');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Webhook setup function
async function setupWebhooks() {
  try {
    console.log('\n🔗 Setting up webhooks...');
    
    const space = await client.getSpace(SPACE_ID);
    
    // Webhook for Vercel build trigger
    const webhookData = {
      name: 'Vercel Build Trigger',
      url: process.env.VERCEL_WEBHOOK_URL || 'https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID',
      topics: [
        'Entry.publish',
        'Entry.unpublish',
        'Entry.archive',
        'Entry.unarchive',
        'Asset.publish',
        'Asset.unpublish'
      ],
      headers: [
        {
          key: 'User-Agent',
          value: 'Navi-Website-Contentful-Webhook'
        }
      ]
    };

    try {
      const webhook = await space.createWebhook(webhookData);
      console.log('✅ Webhook created successfully');
      console.log(`   Webhook ID: ${webhook.sys.id}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('⚠️  Webhook already exists');
      } else {
        console.error('❌ Webhook creation failed:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Webhook setup failed:', error.message);
  }
}

// Content validation function
async function validateContentModels() {
  try {
    console.log('\n🔍 Validating content models...');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');
    
    const contentTypes = await environment.getContentTypes();
    const expectedTypes = [
      'homePage', 'productPage', 'corporatePage', 'resourcePage', 
      'calculator', 'heroSection', 'featureCard', 'faq', 
      'ctaSection', 'trustIndicator', 'siteNavigation', 'siteSettings'
    ];
    
    const existingTypes = contentTypes.items.map(ct => ct.sys.id);
    const missingTypes = expectedTypes.filter(type => !existingTypes.includes(type));
    
    if (missingTypes.length === 0) {
      console.log('✅ All required content types are present');
    } else {
      console.log('⚠️  Missing content types:', missingTypes.join(', '));
    }
    
    console.log(`📊 Total content types: ${contentTypes.items.length}`);
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--validate')) {
    await validateContentModels();
  } else if (args.includes('--webhooks')) {
    await setupWebhooks();
  } else {
    await setupContentful();
    
    if (args.includes('--with-webhooks')) {
      await setupWebhooks();
    }
    
    await validateContentModels();
  }
}

main().catch(console.error);
