export interface Vehicle {
    id: string;
    model: string;
    status: 'Livre' | 'Alugada' | 'Manutenção';
    user?: string;
    image: string;
    iotStatus?: 'Conectada' | 'Desconectada';
  }
  