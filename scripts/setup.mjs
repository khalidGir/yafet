const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY env vars');
  console.error('Run with: node --env-file=.env scripts/setup.mjs');
  process.exit(1);
}

const bucketName = 'produc-image';

async function createBucket() {
  console.log(`Creating storage bucket "${bucketName}"...`);

  const res = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ id: bucketName, name: bucketName, public: true }),
  });

  if (res.ok) {
    console.log(`Bucket "${bucketName}" created.`);
  } else {
    const body = await res.json();
    if (JSON.stringify(body).includes('already exists')) {
      console.log(`Bucket "${bucketName}" already exists.`);
    } else {
      console.error('Create bucket failed:', body);
    }
  }
}

async function main() {
  await createBucket();

  console.log('\nNext: run the migration SQL in the Supabase SQL Editor:');
  console.log('  https://supabase.com/dashboard/project/mumjslllcthsjrvyuvyl/sql/new');
  console.log('\nCopy and paste the contents of: supabase/migrations/00001_initial_schema.sql');
  console.log('\nThen seed data:');
  console.log('  node --env-file=.env seed.mjs');
}

main().catch(console.error);
