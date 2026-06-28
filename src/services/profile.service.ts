import client from "@/api/client";

export type ProfileUpdate = {
  name?: string;
  phone?: string;
};

export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await client
      .from("users")
      .select("id, email, name, phone, role")
      .eq("id", userId)
      .single();
    return { data, error };
  },

  async updateProfile(userId: string, updates: ProfileUpdate) {
    const { data, error } = await client
      .from("users")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select("id, email, name, phone, role")
      .single();
    return { data, error };
  },
};
