import { createClient } from "@supabase/supabase-js";

const normalizeEnv = (value: string | undefined) => {
	if (!value) return "";
	return value.trim().replace(/^['\"]|['\"]$/g, "");
};

const supabaseUrl = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

if (!supabaseUrl) {
	throw new Error(
		"Missing NEXT_PUBLIC_SUPABASE_URL. Add it to /.env.local and restart the dev server."
	);
}

if (!supabaseAnonKey) {
	throw new Error(
		"Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Add it to /.env.local and restart the dev server."
	);
}

export const client = createClient(supabaseUrl, supabaseAnonKey);

export default client;

