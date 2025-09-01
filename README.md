# CryptoPortfolio Manager

Um sistema completo de gestão de portfólio de criptomoedas e NFTs para investidores iniciantes e intermediários.

## 🚀 Funcionalidades

### ✅ MVP Atual
- **Dashboard Interativo**: Visão consolidada do portfólio com gráficos em tempo real
- **Gestão de Wallets**: Conecte e monitore múltiplas carteiras (MetaMask, Ledger, Coinbase, Trust Wallet)
- **Sistema de Alertas**: Configure alertas de preço e variação percentual
- **Histórico Completo**: Visualize e exporte todas as transações
- **Perfil e Segurança**: Configurações de conta e autenticação
- **Design Responsivo**: Otimizado para desktop e mobile

### 🔮 Roadmap Futuro
- Integração com exchanges (Binance, Coinbase Pro, Kraken)
- Autenticação 2FA (Google Authenticator, SMS)
- Relatórios avançados e análises de performance
- Notificações push em tempo real
- Suporte a NFTs e marketplaces
- IA para análise de tendências
- Modo escuro

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **UI/UX**: TailwindCSS + Lucide React Icons
- **Gráficos**: Recharts
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **APIs**: CoinGecko API para dados de criptomoedas
- **Roteamento**: React Router
- **Forms**: React Hook Form + Zod
- **Notificações**: React Hot Toast

## ⚡ Como Executar

### Pré-requisitos
- Node.js 18+
- Conta no Supabase
- (Opcional) API Key do CoinGecko

### Instalação

1. **Clone e instale dependências:**
```bash
npm install
```

2. **Configure o Supabase:**
   - Clique no botão "Connect to Supabase" no canto superior direito
   - Ou crie um projeto em [supabase.com](https://supabase.com)
   - Execute as migrations em `supabase/migrations/`

3. **Configure variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

4. **Execute o projeto:**
```bash
npm run dev
```

## 🏗️ Arquitetura

### Frontend
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Auth/           # Autenticação
│   ├── Common/         # Componentes gerais
│   ├── Dashboard/      # Componentes do dashboard
│   └── Layout/         # Layout da aplicação
├── hooks/              # Custom hooks
├── lib/                # Configurações e utilitários
├── pages/              # Páginas da aplicação
└── types/              # Tipos TypeScript
```

### Backend (Supabase)
```
supabase/
└── migrations/         # Migrations do banco de dados
```

## 🔐 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- **Autenticação JWT** via Supabase
- **Criptografia** de dados sensíveis
- **Validação** de inputs com Zod
- **HTTPS** obrigatório em produção
- **Rate limiting** nas APIs

## 📊 APIs Integradas

### CoinGecko API
- Preços em tempo real de criptomoedas
- Dados de mercado e volume
- Histórico de preços
- Rate limit: 50 calls/min (gratuito)

### Futuras Integrações
- Binance API (dados de portfolio)
- Coinbase API (transações)
- OpenSea API (NFTs)
- Firebase (notificações push)

## 🎨 Design System

### Cores Principais
- **Primária**: Blue-600 (#2563EB)
- **Sucesso**: Green-600 (#16A34A)
- **Alerta**: Orange-600 (#EA580C)
- **Erro**: Red-600 (#DC2626)
- **Neutro**: Gray-50 a Gray-900

### Tipografia
- **Font Family**: Inter (via Google Fonts)
- **Pesos**: 400 (Regular), 600 (Semibold), 700 (Bold)
- **Tamanhos**: 12px a 32px com scale consistente

### Espaçamento
- **Sistema**: 8px base (Tailwind spacing)
- **Componentes**: Padding e margin consistentes
- **Layout**: Grid responsivo com breakpoints

## 📱 Responsividade

- **Mobile**: < 768px (stack layout, mobile navigation)
- **Tablet**: 768px - 1024px (sidebar collapsible)
- **Desktop**: > 1024px (sidebar fixo, layout completo)

## 🚀 Deploy

### Bolt Hosting (Recomendado)
```bash
# O deploy será feito automaticamente via Bolt
```

### Manual (Netlify/Vercel)
```bash
npm run build
# Upload da pasta dist/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email**: support@cryptoportfolio.com
- **Discord**: [Comunidade CryptoPortfolio](https://discord.gg/cryptoportfolio)
- **Documentação**: [docs.cryptoportfolio.com](https://docs.cryptoportfolio.com)

---

Made with ❤️ by CryptoPortfolio Team