export interface UsersInterface {
  id: number;
  uuid?: string;
  nom?: string;
  prenoms?: string;
  telephone?: string;
  email?: string;
  password?: string;
  photo?: string;
  date_naissance?: Date;
  cni?: string;
  cni_recto?: string;
  cni_verso?: string;
  code?: string;
  solde?: string;
  role_id?: number;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface TransactionInterface {
  id: number;
  uuid: string;
  numero_transaction: string;
  montant: number;
  type_transaction_id: number;
  beneficiaire_id: number;
  expediteur_id: number;
  etat_transaction: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  beneficiaire: UsersInterface;
  expediteur: UsersInterface;
}
