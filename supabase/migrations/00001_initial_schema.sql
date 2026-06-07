CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_urls JSONB NOT NULL DEFAULT '[]'
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow anon insert" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon delete" ON products
  FOR DELETE USING (true);
