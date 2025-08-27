# Guia do Sistema de Autenticação - CEE-SC

## 🔐 Visão Geral

O sistema de inventário agora possui autenticação restrita, permitindo acesso apenas para usuários com emails do domínio **@sed.sc.gov.br**. Isso garante que apenas funcionários autorizados da Secretaria de Estado da Educação possam acessar o sistema.

## 🚀 Funcionalidades de Segurança

### **Autenticação Restrita**

- ✅ Acesso apenas para emails @sed.sc.gov.br
- ✅ Sistema de login e registro
- ✅ Sessões com expiração automática (24 horas)
- ✅ Logout seguro
- ✅ Validação de credenciais

### **Interface de Usuário**

- ✅ Tela de login moderna e responsiva
- ✅ Formulário de registro com validações
- ✅ Informações do usuário no header
- ✅ Botão de logout
- ✅ Mensagens de feedback

## 👤 Como Usar

### **1. Primeiro Acesso (Registro)**

1. **Acesse o sistema** - A tela de login será exibida automaticamente
2. **Clique em "Registro"** - Aba para criar nova conta
3. **Preencha os dados:**
   - **Nome Completo**: Seu nome completo
   - **Cargo/Função**: Sua função na instituição
   - **Email**: Seu email @sed.sc.gov.br
   - **Senha**: Mínimo 6 caracteres
   - **Confirmar Senha**: Confirme a senha
4. **Clique em "Criar Conta"**
5. **Login automático** - Após registro bem-sucedido

### **2. Acessos Posteriores (Login)**

1. **Digite seu email** @sed.sc.gov.br
2. **Digite sua senha**
3. **Clique em "Entrar"**
4. **Acesso liberado** - Sistema disponível

### **3. Logout**

1. **Clique no botão de logout** no header
2. **Confirme a ação**
3. **Sessão encerrada** - Retorna à tela de login

## 🔒 Validações de Segurança

### **Validação de Email**

- ✅ Formato de email válido
- ✅ Domínio @sed.sc.gov.br obrigatório
- ✅ Email único por usuário

### **Validação de Senha**

- ✅ Mínimo 6 caracteres
- ✅ Confirmação obrigatória
- ✅ Senhas devem coincidir

### **Validação de Dados**

- ✅ Nome completo obrigatório
- ✅ Cargo/função obrigatório
- ✅ Todos os campos preenchidos

## 📱 Interface Responsiva

### **Desktop**

- Tela de login centralizada
- Formulários bem organizados
- Navegação por abas
- Informações do usuário no header

### **Mobile**

- Interface adaptada para telas pequenas
- Botões e campos otimizados
- Navegação touch-friendly
- Responsividade completa

## 🔄 Gerenciamento de Sessão

### **Sessão Ativa**

- **Duração**: 24 horas
- **Persistência**: Mantida entre abas
- **Segurança**: Token único por sessão

### **Expiração**

- **Automática**: Após 24 horas
- **Logout**: Limpa dados locais
- **Reautenticação**: Necessária após expiração

### **Logout Manual**

- **Botão**: Disponível no header
- **Confirmação**: Evita logout acidental
- **Limpeza**: Remove todos os dados de sessão

## 🛡️ Segurança dos Dados

### **Armazenamento Local**

- **Usuários**: Lista de usuários registrados
- **Sessão**: Dados da sessão atual
- **Token**: Token de autenticação
- **Expiração**: Timestamp de expiração

### **Proteção**

- **Validação**: Todos os dados validados
- **Sanitização**: Entradas limpas
- **Isolamento**: Dados separados por domínio

## 📊 Estrutura de Dados

### **Usuário Registrado**

```json
{
  "id": "1234567890",
  "email": "usuario@sed.sc.gov.br",
  "password": "senha_hash",
  "nome": "Nome Completo",
  "cargo": "Cargo/Função",
  "dataRegistro": "2024-01-01T00:00:00.000Z",
  "ultimoAcesso": "2024-01-01T00:00:00.000Z"
}
```

### **Sessão Ativa**

```json
{
  "ceeAuthUser": "dados_do_usuario",
  "ceeAuthToken": "token_único",
  "ceeAuthExpiry": "timestamp_expiração"
}
```

## 🔧 Configuração Técnica

### **Arquivos do Sistema**

- `auth-system.js` - Lógica de autenticação
- `styles.css` - Estilos da interface
- `index.html` - Estrutura HTML
- `app.js` - Integração com sistema principal

### **Dependências**

- **Bootstrap 5.3** - Interface responsiva
- **Font Awesome 6.4** - Ícones
- **JavaScript ES6+** - Funcionalidades

## 🚨 Solução de Problemas

### **Erro: "Email inválido"**

- Verifique se o email termina com @sed.sc.gov.br
- Confirme o formato do email
- Tente novamente

### **Erro: "Senha muito curta"**

- Use pelo menos 6 caracteres
- Inclua letras e números
- Confirme a senha corretamente

### **Erro: "Email já existe"**

- Use outro email @sed.sc.gov.br
- Faça login com email existente
- Contate o administrador

### **Erro: "Credenciais inválidas"**

- Verifique email e senha
- Confirme se a conta existe
- Tente fazer registro primeiro

### **Sessão expirada**

- Faça login novamente
- Sessões duram 24 horas
- Dados locais preservados

## 📋 Fluxo de Autenticação

### **1. Acesso Inicial**

```
Usuário acessa → Verifica sessão → Se não autenticado → Mostra login
```

### **2. Registro**

```
Usuário registra → Valida dados → Cria conta → Login automático
```

### **3. Login**

```
Usuário loga → Valida credenciais → Cria sessão → Acesso liberado
```

### **4. Uso do Sistema**

```
Usuário autenticado → Acesso completo → Sessão ativa → Dados preservados
```

### **5. Logout**

```
Usuário sai → Limpa sessão → Remove dados → Retorna ao login
```

## 🔄 Integração com Sistema

### **Proteção de Dados**

- ✅ Inventário protegido por autenticação
- ✅ Dados associados ao usuário
- ✅ Backup e restauração seguros
- ✅ Google Sheets integrado

### **Funcionalidades Disponíveis**

- ✅ Cadastro de ativos
- ✅ Consulta e filtros
- ✅ Exportação de dados
- ✅ Backup/restauração
- ✅ Sincronização Google Sheets
- ✅ Geração de QR Codes

## 📞 Suporte

### **Problemas Técnicos**

- Verifique a conexão com a internet
- Limpe o cache do navegador
- Tente em outro navegador
- Contate a equipe de TI

### **Problemas de Acesso**

- Confirme se o email é @sed.sc.gov.br
- Verifique se a conta foi criada
- Tente fazer registro novamente
- Contate o administrador

### **Problemas de Sessão**

- Faça logout e login novamente
- Verifique se não expirou
- Limpe dados do navegador
- Tente em modo privado

---

**Desenvolvido para o CONSELHO ESTADUAL DE EDUCAÇÃO DE SANTA CATARINA (CEE-SC)**
**Acesso restrito ao domínio @sed.sc.gov.br**
