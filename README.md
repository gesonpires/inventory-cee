# Sistema de Inventário de Computadores - CEE-SC

Sistema web para gerenciamento do inventário de computadores do **CONSELHO ESTADUAL DE EDUCAÇÃO DE SANTA CATARINA (CEE-SC)**.

## 📋 Funcionalidades

### ✨ Cadastro de Ativos

- Formulário completo com todos os campos necessários
- Validação de dados obrigatórios
- Verificação de ID único
- Interface responsiva e moderna

### 🔍 Busca e Filtros

- Busca por ID, hostname, usuário responsável ou patrimônio
- Filtro por setor/comissão
- Filtro por status do equipamento
- Busca em tempo real

### 📊 Visualização e Gestão

- Tabela com informações principais
- Visualização detalhada de cada ativo
- Edição de informações
- Exclusão de registros
- Estatísticas em tempo real

### 📈 Estatísticas

- Total de ativos
- Ativos em uso
- Equipamentos em manutenção
- Garantias expiradas

### 💾 Exportação

- Exportação para CSV
- Dados completos do inventário
- Nome do arquivo com data

## 🖥️ Campos do Inventário

| Campo               | Descrição                              | Obrigatório |
| ------------------- | -------------------------------------- | ----------- |
| ID_Ativo            | Identificador único do ativo           | ✅          |
| Patrimonio_CIASC    | Número do patrimônio CIASC             | ✅          |
| Serial_Number       | Número de série do equipamento         | ✅          |
| Hostname            | Nome do computador na rede             | ✅          |
| Usuario_Responsavel | Nome do usuário responsável            | ✅          |
| Setor_Comissão      | Setor ou comissão do CEE-SC            | ✅          |
| Localização         | Local físico do equipamento            | ✅          |
| Modelo              | Modelo do computador                   | ✅          |
| CPU                 | Processador                            | ✅          |
| RAM_GB              | Memória RAM em GB                      | ✅          |
| Armazenamento_GB    | Capacidade de armazenamento            | ✅          |
| Tipo_Armazenamento  | SSD, HDD ou SSD + HDD                  | ✅          |
| Sistema_Operacional | Sistema operacional instalado          | ✅          |
| Build_SO            | Versão/build do SO                     | ❌          |
| Office_Versão       | Versão do Office                       | ❌          |
| Antivirus           | Software antivírus                     | ❌          |
| Endereço_IP         | Endereço IP da rede                    | ❌          |
| MAC_Address         | Endereço MAC                           | ❌          |
| Data_Aquisição      | Data de aquisição                      | ✅          |
| Garantia_Fim        | Data de fim da garantia                | ❌          |
| Status              | Ativo, Inativo, Manutenção, Descartado | ✅          |
| Ultima_Manutenção   | Data da última manutenção              | ❌          |
| Observações         | Observações adicionais                 | ❌          |

## 🏢 Setores/Comissões Disponíveis

- **Presidência**
- **Secretaria Executiva**
- **Comissão de Legislação**
- **Comissão de Ensino Fundamental**
- **Comissão de Ensino Médio**
- **Comissão de Educação Superior**
- **TI**
- **Administrativo**

## 🚀 Como Usar

### 1. Acesso ao Sistema

- Abra o arquivo `index.html` em qualquer navegador moderno
- O sistema funciona completamente offline

### 2. Cadastrar Novo Ativo

1. Preencha todos os campos obrigatórios no formulário
2. Clique em "Salvar Ativo"
3. O ativo será adicionado à tabela e às estatísticas

### 3. Buscar e Filtrar

- Use o campo de busca para encontrar ativos específicos
- Selecione filtros por setor ou status
- Os resultados são atualizados em tempo real

### 4. Gerenciar Ativos

- **Visualizar**: Clique no ícone de olho para ver detalhes completos
- **Editar**: Clique no ícone de lápis para editar informações
- **Excluir**: Clique no ícone de lixeira para remover o ativo

### 5. Exportar Dados

- Clique em "Exportar CSV" para baixar todos os dados
- O arquivo será salvo com data atual no nome

## 💾 Armazenamento

- Os dados são salvos no **localStorage** do navegador
- Não há necessidade de servidor ou banco de dados
- Os dados persistem entre sessões do navegador
- **Backup recomendado**: Exporte regularmente os dados em CSV

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização com Bootstrap 5
- **JavaScript ES6+**: Lógica da aplicação
- **Bootstrap 5**: Framework CSS para interface responsiva
- **LocalStorage**: Armazenamento local dos dados

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:

- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone

## 🔧 Manutenção

### Backup de Dados

```javascript
// Para fazer backup manual via console do navegador:
localStorage.getItem("inventarioCEE");
```

### Restaurar Dados

```javascript
// Para restaurar dados via console do navegador:
localStorage.setItem("inventarioCEE", JSON.stringify(dados));
```

## 📋 Dados de Exemplo

O sistema inclui dados de exemplo para demonstração:

- **CEE001**: Computador da Presidência
- **CEE002**: Computador da Secretaria Executiva

## 🔒 Segurança

- Dados armazenados localmente no navegador
- Sem transmissão de dados para servidores externos
- Controle total sobre as informações

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema, entre em contato com a equipe de TI do CEE-SC.

---

**Desenvolvido para o CONSELHO ESTADUAL DE EDUCAÇÃO DE SANTA CATARINA (CEE-SC)**
