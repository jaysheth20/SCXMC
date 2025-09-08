// scripts/test-graphql.js - Test GraphQL connection and push to Sitecore Search
const fetch = require('node-fetch');

const config = {
  // Sitecore GraphQL
  graphqlUrl: 'https://xmc-sourceved15434-jsitecorexmc413-dev0494.sitecorecloud.io/sitecore/api/graph/edge',
  apiKey: 'B12D98C5-FB7B-48AE-8BF9-EBF7B0546DC9',

  // Sitecore Search
  search: {
    baseUrl: 'https://discover.sitecorecloud.io/ingestion/v1/domains/128591118/sources/1164436/entities/content/documents',
    authorization: '01-865f1320-a8dce3b8d79176284d0a3fce0df0280597b03727',
    locale: 'en_us',
  },
};

const TEST_QUERY = `
  query TestConnection {
    search(
      where: {
        AND: [
          { name: "_templates", value: "{554AB7F8-6E55-47CA-A3C0-EF0DFA5C2257}", operator: EQ }
          { name: "_language", value: "en", operator: EQ }
        ]
      }
      first: 10
    ) {
      results {
        id
        name
        path
        blogTitle: field(name: "Blog Title") {
          value
        }
        blogDescription: field(name: "Blog Description") {
          value
        }
        author: field(name: "Author") {
          value
        }
        image: field(name: "Image") {
          jsonValue
        }
        template {
          id
          name
        }
        language {
          name
        }
      }
    }
  }
`;

// Helper function to strip HTML tags
function stripHtmlTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper function to extract image URL
function extractImageUrl(imageData, itemName) {
  if (!imageData) return '';

  try {
    if (typeof imageData === 'object' && imageData.src) {
      return `https://xmc-sourceved15434-jsitecorexmc413-dev0494.sitecorecloud.io${imageData.src}`;
    }

    if (typeof imageData === 'string' && imageData.includes('mediaid')) {
      const mediaIdMatch = imageData.match(/mediaid="{([^}]+)}"/i);
      if (mediaIdMatch) {
        return `https://xmc-sourceved15434-jsitecorexmc413-dev0494.sitecorecloud.io/-/media/${mediaIdMatch[1]}.ashx`;
      }
    }
  } catch (error) {
    console.warn(`Error parsing image for ${itemName}:`, error.message);
  }

  return '';
}

// Transform Sitecore data to Search format
function transformForSearch(sitecoreItems) {
  return sitecoreItems.map((item, index) => ({
    document: {
      id: item.id || `${index + 1}`, // fallback to index if no ID
      fields: {
        name: item.blogTitle?.value || item.name,
        description: stripHtmlTags(item.blogDescription?.value || ''),
        author: item.author?.value || 'Unknown',
        type: 'blog',
        url: `https://your-site.com/blogs/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        image_url: extractImageUrl(item.image?.jsonValue, item.name),
      },
    },
  }));
}

// Push documents to Sitecore Search
async function pushToSitecoreSearch(documents) {
  try {
    console.log('🚀 Pushing documents to Sitecore Search...');
    console.log(`Documents to push: ${documents.length}`);

    // Prepare NDJSON (no [] array, each JSON object separated by newline)
    const ndjson = documents.map((doc) => JSON.stringify(doc)).join('\n');

    // Log JSON payload before sending
    console.log('\n' + '='.repeat(70));
    console.log('📝 Documents JSON (your requested format):');
    console.log(ndjson);

    const url = `${config.search.baseUrl}?locale=${config.search.locale}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.search.authorization,
      },
      body: ndjson, // 👈 no [] wrapping
    });

    console.log('Search API Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Sitecore Search API request failed');
      console.error('Response body:', errorText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Successfully pushed documents to Sitecore Search');
    console.log('Search API Response:', JSON.stringify(result, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error pushing to Sitecore Search:', error.message);
    return false;
  }
}

async function testGraphQLConnection() {
  try {
    console.log('🔄 Testing GraphQL connection...');
    console.log('Endpoint:', config.graphqlUrl);
    console.log('API Key:', config.apiKey.substring(0, 8) + '...');
    console.log('='.repeat(70));

    const response = await fetch(config.graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        sc_apikey: config.apiKey,
      },
      body: JSON.stringify({
        query: TEST_QUERY,
      }),
    });

    console.log('Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Request failed');
      console.error('Response body:', errorText);
      return;
    }

    const result = await response.json();

    if (result.errors) {
      console.error('❌ GraphQL errors:');
      console.error(JSON.stringify(result.errors, null, 2));
      return;
    }

    const items = result.data?.search?.results || [];
    console.log(`✅ GraphQL Connection successful!`);
    console.log(`Found ${items.length} blog items:`);
    console.log('='.repeat(70));

    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.blogTitle?.value || item.name}`);
      console.log(`   ID: ${item.id}`);
      console.log(`   Author: ${item.author?.value || 'N/A'}`);
      console.log(`   Description: ${(item.blogDescription?.value || '').substring(0, 80)}...`);
      console.log('');
    });

    if (items.length === 0) {
      console.log('⚠️  No items found. Cannot proceed with Search API test.');
      return;
    }

    // Transform data for Sitecore Search
    console.log('='.repeat(70));
    console.log('🔄 Transforming data for Sitecore Search...');

    const searchDocuments = transformForSearch(items);

    console.log('📋 Sample transformed document:');
    if (searchDocuments.length > 0) {
      console.log(JSON.stringify(searchDocuments[0], null, 2));
    }

    console.log('\n' + '='.repeat(70));
    console.log('📝 All documents prepared for Search:');
    searchDocuments.forEach((doc, index) => {
      const fields = doc.document.fields;
      console.log(`${index + 1}. ID: ${doc.document.id}`);
      console.log(`   Name: ${fields.name}`);
      console.log(`   Author: ${fields.author}`);
      console.log(`   Type: ${fields.type}`);
      console.log(`   URL: ${fields.url}`);
      console.log('');
    });

    // Push to Sitecore Search
    console.log('='.repeat(70));
    const success = await pushToSitecoreSearch(searchDocuments);

    if (success) {
      console.log('='.repeat(70));
      console.log('🎉 COMPLETE SUCCESS!');
      console.log('✅ GraphQL data fetched successfully');
      console.log('✅ Data transformed for Search');
      console.log('✅ Documents pushed to Sitecore Search');
      console.log(`📊 Total items processed: ${items.length}`);
    } else {
      console.log('❌ Failed to push to Sitecore Search');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Command line argument handling
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'fetch-only') {
    console.log('🔍 Testing GraphQL connection only (no Search push)...\n');
    global.pushToSitecoreSearch = () => {
      console.log('⏭️  Skipping Sitecore Search push (fetch-only mode)');
      return Promise.resolve(true);
    };
    await testGraphQLConnection();
  } else {
    console.log('🚀 Testing full pipeline: GraphQL fetch + Search push...\n');
    await testGraphQLConnection();
  }
}

// Run the test
if (require.main === module) {
  main();
}

module.exports = { testGraphQLConnection, transformForSearch, pushToSitecoreSearch };
