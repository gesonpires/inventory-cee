// Integração com Google Sheets - CEE-SC Inventário
class GoogleSheetsIntegration {
    constructor() {
        this.API_KEY = ''; // Será configurado pelo usuário
        this.SPREADSHEET_ID = ''; // Será configurado pelo usuário
        this.SHEET_NAME = 'Inventário';
        this.isConfigured = false;
        this.init();
    }

    init() {
        // Carregar configurações salvas
        this.loadConfiguration();
        
        // Verificar se está configurado
        if (this.API_KEY && this.SPREADSHEET_ID) {
            this.isConfigured = true;
            this.createSheetIfNotExists();
        }
    }

    loadConfiguration() {
        this.API_KEY = localStorage.getItem('googleSheetsAPIKey') || '';
        this.SPREADSHEET_ID = localStorage.getItem('googleSheetsSpreadsheetId') || '';
    }

    saveConfiguration(apiKey, spreadsheetId) {
        this.API_KEY = apiKey;
        this.SPREADSHEET_ID = spreadsheetId;
        localStorage.setItem('googleSheetsAPIKey', apiKey);
        localStorage.setItem('googleSheetsSpreadsheetId', spreadsheetId);
        this.isConfigured = true;
    }

    async createSheetIfNotExists() {
        if (!this.isConfigured) return;

        try {
            // Verificar se a planilha existe
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}?key=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Planilha não encontrada ou API key inválida');
            }

            const data = await response.json();
            const sheetExists = data.sheets.some(sheet => 
                sheet.properties.title === this.SHEET_NAME
            );

            if (!sheetExists) {
                await this.createNewSheet();
            }

            return true;
        } catch (error) {
            console.error('Erro ao verificar/criar planilha:', error);
            return false;
        }
    }

    async createNewSheet() {
        const requestBody = {
            requests: [{
                addSheet: {
                    properties: {
                        title: this.SHEET_NAME,
                        gridProperties: {
                            rowCount: 1000,
                            columnCount: 25
                        }
                    }
                }
            }]
        };

        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}:batchUpdate?key=${this.API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao criar nova aba na planilha');
        }
    }

    async syncToGoogleSheets(ativos) {
        if (!this.isConfigured) {
            throw new Error('Google Sheets não está configurado');
        }

        try {
            // Preparar cabeçalhos
            const headers = [
                'ID_Ativo',
                'Patrimonio_CIASC',
                'Serial_Number',
                'Hostname',
                'Usuario_Responsavel',
                'Setor_Comissão',
                'Localização',
                'Modelo',
                'CPU',
                'RAM_GB',
                'Armazenamento_GB',
                'Tipo_Armazenamento',
                'Sistema_Operacional',
                'Build_SO',
                'Office_Versão',
                'Antivirus',
                'Endereço_IP',
                'MAC_Address',
                'Data_Aquisição',
                'Garantia_Fim',
                'Status',
                'Ultima_Manutenção',
                'Observações',
                'Data_Cadastro',
                'Última_Atualização'
            ];

            // Preparar dados
            const rows = ativos.map(ativo => [
                ativo.idAtivo,
                ativo.patrimonioCIASC,
                ativo.serialNumber,
                ativo.hostname,
                ativo.usuarioResponsavel,
                ativo.setorComissao,
                ativo.localizacao,
                ativo.modelo,
                ativo.cpu,
                ativo.ramGB,
                ativo.armazenamentoGB,
                ativo.tipoArmazenamento,
                ativo.sistemaOperacional,
                ativo.buildSO || '',
                ativo.officeVersao || '',
                ativo.antivirus || '',
                ativo.enderecoIP || '',
                ativo.macAddress || '',
                ativo.dataAquisicao,
                ativo.garantiaFim || '',
                ativo.status,
                ativo.ultimaManutencao || '',
                ativo.observacoes || '',
                ativo.dataCadastro,
                new Date().toISOString()
            ]);

            // Limpar planilha e inserir novos dados
            const clearRequest = {
                ranges: [`${this.SHEET_NAME}!A:Z`]
            };

            await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values:batchClear?key=${this.API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(clearRequest)
                }
            );

            // Inserir cabeçalhos e dados
            const values = [headers, ...rows];
            const updateRequest = {
                values: values
            };

            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${this.SHEET_NAME}!A1:Z${values.length}?valueInputOption=RAW&key=${this.API_KEY}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateRequest)
                }
            );

            if (!response.ok) {
                throw new Error('Erro ao sincronizar com Google Sheets');
            }

            // Formatar cabeçalhos
            await this.formatHeaders();

            return true;
        } catch (error) {
            console.error('Erro na sincronização:', error);
            throw error;
        }
    }

    async formatHeaders() {
        const formatRequest = {
            requests: [{
                repeatCell: {
                    range: {
                        sheetId: 0,
                        startRowIndex: 0,
                        endRowIndex: 1,
                        startColumnIndex: 0,
                        endColumnIndex: 25
                    },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: {
                                red: 0.12,
                                green: 0.23,
                                blue: 0.45
                            },
                            textFormat: {
                                bold: true,
                                foregroundColor: {
                                    red: 1,
                                    green: 1,
                                    blue: 1
                                }
                            }
                        }
                    },
                    fields: 'userEnteredFormat(backgroundColor,textFormat)'
                }
            }]
        };

        await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}:batchUpdate?key=${this.API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formatRequest)
            }
        );
    }

    async loadFromGoogleSheets() {
        if (!this.isConfigured) {
            throw new Error('Google Sheets não está configurado');
        }

        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${this.SHEET_NAME}!A2:Z?key=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Erro ao carregar dados do Google Sheets');
            }

            const data = await response.json();
            const rows = data.values || [];

            // Converter linhas para objetos
            const ativos = rows.map(row => ({
                id: Date.now() + Math.random(), // ID único
                idAtivo: row[0] || '',
                patrimonioCIASC: row[1] || '',
                serialNumber: row[2] || '',
                hostname: row[3] || '',
                usuarioResponsavel: row[4] || '',
                setorComissao: row[5] || '',
                localizacao: row[6] || '',
                modelo: row[7] || '',
                cpu: row[8] || '',
                ramGB: parseInt(row[9]) || 0,
                armazenamentoGB: parseInt(row[10]) || 0,
                tipoArmazenamento: row[11] || '',
                sistemaOperacional: row[12] || '',
                buildSO: row[13] || '',
                officeVersao: row[14] || '',
                antivirus: row[15] || '',
                enderecoIP: row[16] || '',
                macAddress: row[17] || '',
                dataAquisicao: row[18] || '',
                garantiaFim: row[19] || '',
                status: row[20] || '',
                ultimaManutencao: row[21] || '',
                observacoes: row[22] || '',
                dataCadastro: row[23] || new Date().toISOString()
            }));

            return ativos;
        } catch (error) {
            console.error('Erro ao carregar do Google Sheets:', error);
            throw error;
        }
    }

    async addSingleRecord(ativo) {
        if (!this.isConfigured) {
            throw new Error('Google Sheets não está configurado');
        }

        try {
            const row = [
                ativo.idAtivo,
                ativo.patrimonioCIASC,
                ativo.serialNumber,
                ativo.hostname,
                ativo.usuarioResponsavel,
                ativo.setorComissao,
                ativo.localizacao,
                ativo.modelo,
                ativo.cpu,
                ativo.ramGB,
                ativo.armazenamentoGB,
                ativo.tipoArmazenamento,
                ativo.sistemaOperacional,
                ativo.buildSO || '',
                ativo.officeVersao || '',
                ativo.antivirus || '',
                ativo.enderecoIP || '',
                ativo.macAddress || '',
                ativo.dataAquisicao,
                ativo.garantiaFim || '',
                ativo.status,
                ativo.ultimaManutencao || '',
                ativo.observacoes || '',
                ativo.dataCadastro,
                new Date().toISOString()
            ];

            const request = {
                values: [row]
            };

            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${this.SHEET_NAME}!A:append?valueInputOption=RAW&key=${this.API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request)
                }
            );

            if (!response.ok) {
                throw new Error('Erro ao adicionar registro no Google Sheets');
            }

            return true;
        } catch (error) {
            console.error('Erro ao adicionar registro:', error);
            throw error;
        }
    }

    getConfigurationStatus() {
        return {
            isConfigured: this.isConfigured,
            hasApiKey: !!this.API_KEY,
            hasSpreadsheetId: !!this.SPREADSHEET_ID
        };
    }

    getSpreadsheetUrl() {
        if (!this.SPREADSHEET_ID) return null;
        return `https://docs.google.com/spreadsheets/d/${this.SPREADSHEET_ID}/edit`;
    }
}

// Exportar para uso global
window.GoogleSheetsIntegration = GoogleSheetsIntegration; 