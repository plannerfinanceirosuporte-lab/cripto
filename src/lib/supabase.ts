import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'metamask' | 'ledger' | 'coinbase' | 'trust';
          address: string;
          balance_usd: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: 'metamask' | 'ledger' | 'coinbase' | 'trust';
          address: string;
          balance_usd?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'metamask' | 'ledger' | 'coinbase' | 'trust';
          address?: string;
          balance_usd?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      price_alerts: {
        Row: {
          id: string;
          user_id: string;
          asset_symbol: string;
          alert_type: 'price_above' | 'price_below' | 'percentage_change';
          target_value: number;
          current_value: number;
          is_active: boolean;
          triggered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asset_symbol: string;
          alert_type: 'price_above' | 'price_below' | 'percentage_change';
          target_value: number;
          current_value?: number;
          is_active?: boolean;
          triggered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asset_symbol?: string;
          alert_type?: 'price_above' | 'price_below' | 'percentage_change';
          target_value?: number;
          current_value?: number;
          is_active?: boolean;
          triggered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          wallet_id: string;
          asset_symbol: string;
          transaction_type: 'buy' | 'sell' | 'transfer' | 'receive';
          amount: number;
          price_usd: number;
          fee: number;
          transaction_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wallet_id: string;
          asset_symbol: string;
          transaction_type: 'buy' | 'sell' | 'transfer' | 'receive';
          amount: number;
          price_usd: number;
          fee?: number;
          transaction_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wallet_id?: string;
          asset_symbol?: string;
          transaction_type?: 'buy' | 'sell' | 'transfer' | 'receive';
          amount?: number;
          price_usd?: number;
          fee?: number;
          transaction_hash?: string | null;
          created_at?: string;
        };
      };
    };
  };
};