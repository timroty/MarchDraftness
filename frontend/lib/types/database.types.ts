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
      BracketGame: {
        Row: {
          created_at: string
          game_number: number
          id: number
          team_one: number | null
          team_two: number | null
          year: number
        }
        Insert: {
          created_at?: string
          game_number: number
          id?: number
          team_one?: number | null
          team_two?: number | null
          year: number
        }
        Update: {
          created_at?: string
          game_number?: number
          id?: number
          team_one?: number | null
          team_two?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "BracketGame_team_one_fkey"
            columns: ["team_one"]
            isOneToOne: false
            referencedRelation: "Team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BracketGame_team_two_fkey"
            columns: ["team_two"]
            isOneToOne: false
            referencedRelation: "Team"
            referencedColumns: ["id"]
          },
        ]
      }
      League: {
        Row: {
          admin_id: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      LeagueYear: {
        Row: {
          created_at: string
          id: number
          league_id: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: number
          league_id: number
          year: number
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "LeagueYear_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "League"
            referencedColumns: ["id"]
          },
        ]
      }
      LeagueYearPlayer: {
        Row: {
          created_at: string
          id: number
          league_year_id: number
          nickname: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          league_year_id: number
          nickname?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          league_year_id?: number
          nickname?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "LeagueYearPlayer_league_year_id_fkey"
            columns: ["league_year_id"]
            isOneToOne: false
            referencedRelation: "LeagueYear"
            referencedColumns: ["id"]
          },
        ]
      }
      LeagueYearTeam: {
        Row: {
          created_at: string
          id: number
          player_id: number | null
          points_per_win: number
          team_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          player_id?: number | null
          points_per_win?: number
          team_id: number
        }
        Update: {
          created_at?: string
          id?: number
          player_id?: number | null
          points_per_win?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "LeagueYearTeam_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "LeagueYearPlayer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "LeagueYearTeam_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "Team"
            referencedColumns: ["id"]
          },
        ]
      }
      Team: {
        Row: {
          created_at: string
          id: number
          name: string
          seed: number
          wins: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          seed: number
          wins?: number
          year: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          seed?: number
          wins?: number
          year?: number
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
      [_ in never]: never
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
