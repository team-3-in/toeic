export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favorite_question: {
        Row: {
          created_at: string | null
          favorite_question_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          favorite_question_id?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          favorite_question_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_question_favorite_question_id_fkey"
            columns: ["favorite_question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_question_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      question: {
        Row: {
          answer: number | null
          body: string | null
          choice: string | null
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          answer?: number | null
          body?: string | null
          choice?: string | null
          created_at?: string | null
          id: number
          updated_at?: string | null
        }
        Update: {
          answer?: number | null
          body?: string | null
          choice?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      toeic: {
        Row: {
          created_at: string | null
          file_name: string | null
          id: number
          question_id: number | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          file_name?: string | null
          id: number
          question_id?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string | null
          id?: number
          question_id?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_toeic_question"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          }
        ]
      }
      wrong_answer_question: {
        Row: {
          created_at: string | null
          history: number | null
          user_id: string
          wrong_answer_question_id: number | null
        }
        Insert: {
          created_at?: string | null
          history?: number | null
          user_id?: string
          wrong_answer_question_id?: number | null
        }
        Update: {
          created_at?: string | null
          history?: number | null
          user_id?: string
          wrong_answer_question_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_wrong_answer_question_question"
            columns: ["wrong_answer_question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wrong_answer_question_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
