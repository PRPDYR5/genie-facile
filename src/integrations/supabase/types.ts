export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      qa_history: {
        Row: {
          answer: string
          created_at: string
          id: string
          level: Database["public"]["Enums"]["education_level"]
          pdf_source: string
          question: string
          subject: Database["public"]["Enums"]["subject_type"]
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          level: Database["public"]["Enums"]["education_level"]
          pdf_source: string
          question: string
          subject: Database["public"]["Enums"]["subject_type"]
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          level?: Database["public"]["Enums"]["education_level"]
          pdf_source?: string
          question?: string
          subject?: Database["public"]["Enums"]["subject_type"]
        }
        Relationships: []
      }
      study_schedules: {
        Row: {
          created_at: string
          end_time: string
          id: string
          level: string
          notification_enabled: boolean | null
          start_time: string
          subject: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          level: string
          notification_enabled?: boolean | null
          start_time: string
          subject: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          level?: string
          notification_enabled?: boolean | null
          start_time?: string
          subject?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      summaries: {
        Row: {
          created_at: string
          file_url: string
          id: string
          level: Database["public"]["Enums"]["level_type"]
          subject: Database["public"]["Enums"]["subject_type"]
          title: string
        }
        Insert: {
          created_at?: string
          file_url: string
          id?: string
          level: Database["public"]["Enums"]["level_type"]
          subject: Database["public"]["Enums"]["subject_type"]
          title: string
        }
        Update: {
          created_at?: string
          file_url?: string
          id?: string
          level?: Database["public"]["Enums"]["level_type"]
          subject?: Database["public"]["Enums"]["subject_type"]
          title?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          focus_mode: boolean
          font_size: string
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          theme: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          focus_mode?: boolean
          font_size?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          theme?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          focus_mode?: boolean
          font_size?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          theme?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      education_level: "seconde" | "premiere" | "terminale"
      level_type: "seconde" | "premiere" | "terminale"
      subject_type: "math" | "physics" | "info"
      supported_language: "fr" | "en"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
