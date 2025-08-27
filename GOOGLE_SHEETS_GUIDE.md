# Guia de Configuração - Google Sheets Integration

## 📋 Visão Geral

Este guia explica como configurar a integração do sistema de inventário com o Google Sheets, permitindo salvar e sincronizar dados na nuvem.

## 🚀 Benefícios da Integração

- ✅ **Backup na nuvem**: Dados seguros no Google Drive
- ✅ **Acesso remoto**: Visualizar dados de qualquer lugar
- ✅ **Colaboração**: Múltiplos usuários podem acessar
- ✅ **Sincronização**: Dados sempre atualizados
- ✅ **Relatórios**: Fácil criação de relatórios no Google Sheets

## 🔧 Passo a Passo da Configuração

### **1. Criar Planilha no Google Sheets**

1. Acesse [sheets.google.com](https://sheets.google.com)
2. Clique em **"+"** para criar uma nova planilha
3. Renomeie a planilha para "Inventário CEE-SC"
4. Copie a URL da planilha (exemplo: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`)

### **2. Configurar Google Cloud Console**

#### **2.1 Criar Projeto**

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Clique em **"Selecionar projeto"** → **"Novo projeto"**
3. Digite um nome (ex: "CEE-SC Inventário")
4. Clique em **"Criar"**

#### **2.2 Habilitar Google Sheets API**

1. No menu lateral, vá em **"APIs e serviços"** → **"Biblioteca"**
2. Pesquise por **"Google Sheets API"**
3. Clique na API e depois em **"Habilitar"**

#### **2.3 Criar Credenciais**

1. Vá em **"APIs e serviços"** → **"Credenciais"**
2. Clique em **"Criar credenciais"** → **"Chave de API"**
3. Copie a chave gerada (será algo como `AIzaSyC...`)

### **3. Configurar no Sistema**

#### **3.1 Acessar Configuração**

1. No sistema de inventário, clique em **"Google Sheets"** nas ações rápidas
2. O modal de configuração será aberto

#### **3.2 Inserir Dados**

1. **URL da Planilha**: Cole a URL completa da planilha criada
2. **API Key**: Cole a chave de API do Google Cloud Console
3. Clique em **"Configurar"**

#### **3.3 Testar Conexão**

1. Clique em **"Testar Conexão"**
2. Se aparecer "Conexão OK", a configuração está correta

## 📊 Estrutura da Planilha

A integração criará automaticamente uma aba chamada **"Inventário"** com as seguintes colunas:

| Coluna | Descrição           |
| ------ | ------------------- |
| A      | ID_Ativo            |
| B      | Patrimonio_CIASC    |
| C      | Serial_Number       |
| D      | Hostname            |
| E      | Usuario_Responsavel |
| F      | Setor_Comissão      |
| G      | Localização         |
| H      | Modelo              |
| I      | CPU                 |
| J      | RAM_GB              |
| K      | Armazenamento_GB    |
| L      | Tipo_Armazenamento  |
| M      | Sistema_Operacional |
| N      | Build_SO            |
| O      | Office_Versão       |
| P      | Antivirus           |
| Q      | Endereço_IP         |
| R      | MAC_Address         |
| S      | Data_Aquisição      |
| T      | Garantia_Fim        |
| U      | Status              |
| V      | Ultima_Manutenção   |
| W      | Observações         |
| X      | Data_Cadastro       |
| Y      | Última_Atualização  |

## 🔄 Funcionalidades de Sincronização

### **Enviar para Google Sheets**

- Sincroniza todos os dados locais para a planilha
- Substitui completamente os dados na planilha
- Formata automaticamente os cabeçalhos

### **Carregar do Google Sheets**

- Importa todos os dados da planilha para o sistema local
- Substitui os dados locais pelos da planilha
- Útil para sincronizar entre diferentes computadores

### **Sincronização Automática**

- Os dados são salvos automaticamente no Google Sheets
- Mantém backup sempre atualizado
- Histórico de mudanças preservado

## 🛡️ Segurança

### **API Key**

- Mantida segura no localStorage do navegador
- Não é compartilhada com terceiros
- Pode ser revogada a qualquer momento no Google Cloud Console

### **Permissões**

- Apenas leitura e escrita na planilha específica
- Não acessa outros arquivos do Google Drive
- Permissões limitadas à planilha configurada

## 🔧 Solução de Problemas

### **Erro: "API Key inválida"**

- Verifique se a API Key está correta
- Confirme se a Google Sheets API está habilitada
- Verifique se o projeto está ativo

### **Erro: "Planilha não encontrada"**

- Verifique se a URL da planilha está correta
- Confirme se a planilha existe e é acessível
- Verifique as permissões da planilha

### **Erro: "Limite de requisições excedido"**

- Google Sheets API tem limite de 300 requisições/minuto
- Aguarde alguns minutos e tente novamente
- Considere fazer sincronização em lotes menores

### **Dados não sincronizam**

- Verifique a conexão com a internet
- Confirme se a planilha não está sendo editada por outro usuário
- Tente fazer uma sincronização manual

## 📱 Acesso Mobile

### **Google Sheets App**

- Instale o app Google Sheets no celular
- Acesse a planilha de qualquer lugar
- Visualize dados em tempo real

### **Sincronização Mobile**

- Os dados são sincronizados automaticamente
- Mudanças feitas no app aparecem no sistema
- Funciona offline com sincronização posterior

## 📈 Relatórios e Análises

### **Relatórios Automáticos**

- Use as funções do Google Sheets para criar relatórios
- Gráficos e dashboards automáticos
- Filtros e ordenação avançados

### **Compartilhamento**

- Compartilhe a planilha com outros usuários
- Controle de permissões (leitura/escrita)
- Comentários e colaboração em tempo real

## 🔄 Backup e Restauração

### **Backup Automático**

- Google Drive faz backup automático
- Histórico de versões preservado
- Recuperação de dados em caso de erro

### **Exportação**

- Exporte dados para Excel, PDF, CSV
- Compartilhe relatórios por email
- Integração com Google Drive

## 📞 Suporte

### **Problemas Técnicos**

- Verifique a documentação do Google Sheets API
- Consulte o console do navegador para erros
- Entre em contato com a equipe de TI

### **Configuração**

- Siga o passo a passo deste guia
- Teste a conexão antes de usar
- Mantenha as credenciais seguras

---

**Desenvolvido para o CONSELHO ESTADUAL DE EDUCAÇÃO DE SANTA CATARINA (CEE-SC)**
