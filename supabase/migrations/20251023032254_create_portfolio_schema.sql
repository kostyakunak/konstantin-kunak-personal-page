/*
  # Portfolio Website Schema

  ## Overview
  Creates the database structure for a personal portfolio website featuring projects,
  work experience, and hobbies sections.

  ## New Tables

  ### `projects`
  Stores information about personal projects
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Project name
  - `description` (text) - Brief project description
  - `full_description` (text) - Detailed project information
  - `technologies` (text[]) - Array of technologies used
  - `demo_url` (text, optional) - Link to live demo
  - `image_url` (text, optional) - Project thumbnail
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### `work_experiences`
  Stores work history and professional experience
  - `id` (uuid, primary key) - Unique identifier
  - `company` (text) - Company name
  - `position` (text) - Job title
  - `description` (text) - Job responsibilities and achievements
  - `start_date` (date) - Employment start date
  - `end_date` (date, optional) - Employment end date (null if current)
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### `hobbies`
  Stores personal hobbies and interests
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Hobby name
  - `content` (text) - Detailed description in article format
  - `images` (text[]) - Array of image URLs
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Allow public read access (portfolio is public-facing)
  - Restrict write access to authenticated users only
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  full_description text NOT NULL,
  technologies text[] DEFAULT '{}',
  demo_url text,
  image_url text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create work_experiences table
CREATE TABLE IF NOT EXISTS work_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  images text[] DEFAULT '{}',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (portfolio is public)
CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to work experiences"
  ON work_experiences FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to hobbies"
  ON hobbies FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can manage content
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert work experiences"
  ON work_experiences FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update work experiences"
  ON work_experiences FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete work experiences"
  ON work_experiences FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert hobbies"
  ON hobbies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update hobbies"
  ON hobbies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hobbies"
  ON hobbies FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_work_experiences_order ON work_experiences(order_index);
CREATE INDEX IF NOT EXISTS idx_hobbies_order ON hobbies(order_index);