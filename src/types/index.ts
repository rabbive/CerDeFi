export interface UserProfile {
  address: string;
  creditScore: number;
  transactionCount: number;
  walletAge: number;
  defiInteractions: number;
  loanRepayments: number;
  transactionVolume: number;
}

export interface ScoreHistory {
  date: string;
  score: number;
}

export interface ScoreComponent {
  name: string;
  value: number;
  percentage: number;
  color: string;
}