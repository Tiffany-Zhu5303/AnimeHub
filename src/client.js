import { createClient } from "@supabase/supabase-js";

const URL = "https://vkpmoosppvixkdzfdnux.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcG1vb3NwcHZpeGtkemZkbnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMjA5ODQsImV4cCI6MjAyODY5Njk4NH0.MgALYIjTk4MZm7yRSlxr13lAiTBhTKH8C-UiP_7HvNM";

export const supabase = createClient(URL, API_KEY);