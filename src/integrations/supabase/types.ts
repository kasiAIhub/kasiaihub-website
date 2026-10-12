export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_emails: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      ai_claim_log: {
        Row: {
          claimed_at: string
          id: number
          lease_id: string
          submission_id: string
          visitor_hash: string | null
        }
        Insert: {
          claimed_at?: string
          id?: number
          lease_id: string
          submission_id: string
          visitor_hash?: string | null
        }
        Update: {
          claimed_at?: string
          id?: number
          lease_id?: string
          submission_id?: string
          visitor_hash?: string | null
        }
        Relationships: []
      }
      diagnostic_submissions: {
        Row: {
          access_token: string
          ai_attempts: number
          ai_last_claimed_at: string | null
          ai_lease_expires_at: string | null
          ai_lease_id: string | null
          ai_opening: string | null
          ai_status: string
          answers: Json
          business_name: string | null
          capacity_score: number
          created_at: string
          customer_money_score: number
          email: string | null
          enrolled: boolean
          growth_score: number
          id: string
          magic_wand_answer: string | null
          name: string | null
          readiness: string | null
          report_downloaded: boolean
          stage: string
          updated_at: string
          user_id: string | null
          whatsapp_number: string | null
        }
        Insert: {
          access_token?: string
          ai_attempts?: number
          ai_last_claimed_at?: string | null
          ai_lease_expires_at?: string | null
          ai_lease_id?: string | null
          ai_opening?: string | null
          ai_status?: string
          answers?: Json
          business_name?: string | null
          capacity_score?: number
          created_at?: string
          customer_money_score?: number
          email?: string | null
          enrolled?: boolean
          growth_score?: number
          id?: string
          magic_wand_answer?: string | null
          name?: string | null
          readiness?: string | null
          report_downloaded?: boolean
          stage: string
          updated_at?: string
          user_id?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          access_token?: string
          ai_attempts?: number
          ai_last_claimed_at?: string | null
          ai_lease_expires_at?: string | null
          ai_lease_id?: string | null
          ai_opening?: string | null
          ai_status?: string
          answers?: Json
          business_name?: string | null
          capacity_score?: number
          created_at?: string
          customer_money_score?: number
          email?: string | null
          enrolled?: boolean
          growth_score?: number
          id?: string
          magic_wand_answer?: string | null
          name?: string | null
          readiness?: string | null
          report_downloaded?: boolean
          stage?: string
          updated_at?: string
          user_id?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      enrolments: {
        Row: {
          ai_tools_list: string
          ai_tools_used: string
          business_description: string
          business_name: string
          computer_comfort: string
          consent: boolean
          created_at: string
          days_available: string[]
          full_name: string
          gmail_account: string
          id: string
          laptop_access: string
          location: string
          preferred_day: string
          preferred_location: string
          sessions_selected: string[]
          status: string
          total_price: number
          updates: boolean
          user_id: string | null
          week_preference: string
          whatsapp: string
        }
        Insert: {
          ai_tools_list?: string
          ai_tools_used?: string
          business_description?: string
          business_name?: string
          computer_comfort?: string
          consent?: boolean
          created_at?: string
          days_available?: string[]
          full_name: string
          gmail_account?: string
          id?: string
          laptop_access?: string
          location?: string
          preferred_day?: string
          preferred_location?: string
          sessions_selected?: string[]
          status?: string
          total_price?: number
          updates?: boolean
          user_id?: string | null
          week_preference?: string
          whatsapp?: string
        }
        Update: {
          ai_tools_list?: string
          ai_tools_used?: string
          business_description?: string
          business_name?: string
          computer_comfort?: string
          consent?: boolean
          created_at?: string
          days_available?: string[]
          full_name?: string
          gmail_account?: string
          id?: string
          laptop_access?: string
          location?: string
          preferred_day?: string
          preferred_location?: string
          sessions_selected?: string[]
          status?: string
          total_price?: number
          updates?: boolean
          user_id?: string | null
          week_preference?: string
          whatsapp?: string
        }
        Relationships: []
      }
      kasi_move_waitlist: {
        Row: {
          area: string
          biggest_headache: string | null
          created_at: string
          id: string
          name: string
          stall_name: string
          whatsapp_number: string
        }
        Insert: {
          area: string
          biggest_headache?: string | null
          created_at?: string
          id?: string
          name: string
          stall_name: string
          whatsapp_number: string
        }
        Update: {
          area?: string
          biggest_headache?: string | null
          created_at?: string
          id?: string
          name?: string
          stall_name?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      township_study_responses: {
        Row: {
          answers: Json
          business_name: string | null
          contact_email: string | null
          created_at: string
          id: string
          whatsapp_number: string | null
        }
        Insert: {
          answers?: Json
          business_name?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          whatsapp_number?: string | null
        }
        Update: {
          answers?: Json
          business_name?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_ai_opening: {
        Args: { _lease: string; _token: string; _visitor: string }
        Returns: {
          opening: string
          outcome: string
        }[]
      }
      fail_ai_opening: {
        Args: { _lease: string; _terminal: boolean; _token: string }
        Returns: undefined
      }
      finish_ai_opening: {
        Args: { _lease: string; _opening: string; _token: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
