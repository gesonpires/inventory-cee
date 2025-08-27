// Sistema de Inventário de Computadores - CEE-SC
class InventarioComputadores {
  constructor() {
    this.ativos = JSON.parse(localStorage.getItem("inventarioCEE")) || [];
    this.googleSheets = null;
    this.authSystem = null;
    this.initializeEventListeners();
    this.atualizarTabela();
    this.atualizarEstatisticas();
    this.initializeAnimations();
    this.initializeGoogleSheets();
    this.initializeAuthSystem();
  }

  initializeGoogleSheets() {
    try {
      this.googleSheets = new GoogleSheetsIntegration();
    } catch (error) {
      console.log("Google Sheets não disponível:", error);
    }
  }

  initializeAuthSystem() {
    try {
      this.authSystem = new AuthSystem();
    } catch (error) {
      console.log("Sistema de autenticação não disponível:", error);
    }
  }

  initializeEventListeners() {
    // Formulário de cadastro
    document.getElementById("inventoryForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.adicionarAtivo();
    });

    // Busca e filtros
    document.getElementById("searchInput").addEventListener("input", () => {
      this.filtrarAtivos();
    });

    document.getElementById("filterSetor").addEventListener("change", () => {
      this.filtrarAtivos();
    });

    document.getElementById("filterStatus").addEventListener("change", () => {
      this.filtrarAtivos();
    });

    // Auto-completar para campos comuns
    this.initializeAutoComplete();
  }

  initializeAnimations() {
    // Adicionar animações de entrada
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observar elementos para animação
    document
      .querySelectorAll(".form-section, .card, .table-container")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  initializeAutoComplete() {
    // Auto-completar para modelos populares
    const modelosComuns = [
      "Dell OptiPlex 7090",
      "Dell OptiPlex 7080",
      "HP EliteDesk 800 G6",
      "HP EliteDesk 800 G7",
      "Lenovo ThinkCentre M90t",
      "Lenovo ThinkCentre M80t",
    ];

    const modeloInput = document.getElementById("modelo");
    modeloInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      if (value.length > 2) {
        const matches = modelosComuns.filter((modelo) =>
          modelo.toLowerCase().includes(value)
        );
        if (matches.length > 0) {
          this.showAutoCompleteSuggestions(modeloInput, matches);
        }
      }
    });
  }

  showAutoCompleteSuggestions(input, suggestions) {
    // Remover sugestões anteriores
    const existingList = document.querySelector(".autocomplete-list");
    if (existingList) existingList.remove();

    const list = document.createElement("ul");
    list.className = "autocomplete-list";
    list.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;

    suggestions.forEach((suggestion) => {
      const item = document.createElement("li");
      item.textContent = suggestion;
      item.style.cssText =
        "padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #eee;";
      item.addEventListener("click", () => {
        input.value = suggestion;
        list.remove();
      });
      item.addEventListener("mouseenter", () => {
        item.style.backgroundColor = "#f8f9fa";
      });
      item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "white";
      });
      list.appendChild(item);
    });

    input.parentNode.style.position = "relative";
    input.parentNode.appendChild(list);

    // Remover lista quando clicar fora
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !list.contains(e.target)) {
        list.remove();
      }
    });
  }

  adicionarAtivo() {
    const ativo = {
      id: Date.now(),
      idAtivo: document.getElementById("idAtivo").value,
      patrimonioCIASC: document.getElementById("patrimonioCIASC").value,
      serialNumber: document.getElementById("serialNumber").value,
      hostname: document.getElementById("hostname").value,
      usuarioResponsavel: document.getElementById("usuarioResponsavel").value,
      setorComissao: document.getElementById("setorComissao").value,
      localizacao: document.getElementById("localizacao").value,
      modelo: document.getElementById("modelo").value,
      cpu: document.getElementById("cpu").value,
      ramGB: parseInt(document.getElementById("ramGB").value),
      armazenamentoGB: parseInt(
        document.getElementById("armazenamentoGB").value
      ),
      tipoArmazenamento: document.getElementById("tipoArmazenamento").value,
      sistemaOperacional: document.getElementById("sistemaOperacional").value,
      buildSO: document.getElementById("buildSO").value,
      officeVersao: document.getElementById("officeVersao").value,
      antivirus: document.getElementById("antivirus").value,
      enderecoIP: document.getElementById("enderecoIP").value,
      macAddress: document.getElementById("macAddress").value,
      dataAquisicao: document.getElementById("dataAquisicao").value,
      garantiaFim: document.getElementById("garantiaFim").value,
      status: document.getElementById("status").value,
      ultimaManutencao: document.getElementById("ultimaManutencao").value,
      observacoes: document.getElementById("observacoes").value,
      dataCadastro: new Date().toISOString(),
    };

    // Verificar se ID já existe
    if (this.ativos.find((a) => a.idAtivo === ativo.idAtivo)) {
      this.showAlert("ID Ativo já existe!", "warning");
      return;
    }

    this.ativos.push(ativo);
    this.salvarDados();
    this.limparFormulario();
    this.atualizarTabela();
    this.atualizarEstatisticas();

    this.showAlert("Ativo cadastrado com sucesso!", "success");
  }

  editarAtivo(id) {
    const ativo = this.ativos.find((a) => a.id === id);
    if (!ativo) return;

    // Preencher formulário com dados do ativo
    document.getElementById("idAtivo").value = ativo.idAtivo;
    document.getElementById("patrimonioCIASC").value = ativo.patrimonioCIASC;
    document.getElementById("serialNumber").value = ativo.serialNumber;
    document.getElementById("hostname").value = ativo.hostname;
    document.getElementById("usuarioResponsavel").value =
      ativo.usuarioResponsavel;
    document.getElementById("setorComissao").value = ativo.setorComissao;
    document.getElementById("localizacao").value = ativo.localizacao;
    document.getElementById("modelo").value = ativo.modelo;
    document.getElementById("cpu").value = ativo.cpu;
    document.getElementById("ramGB").value = ativo.ramGB;
    document.getElementById("armazenamentoGB").value = ativo.armazenamentoGB;
    document.getElementById("tipoArmazenamento").value =
      ativo.tipoArmazenamento;
    document.getElementById("sistemaOperacional").value =
      ativo.sistemaOperacional;
    document.getElementById("buildSO").value = ativo.buildSO;
    document.getElementById("officeVersao").value = ativo.officeVersao;
    document.getElementById("antivirus").value = ativo.antivirus;
    document.getElementById("enderecoIP").value = ativo.enderecoIP;
    document.getElementById("macAddress").value = ativo.macAddress;
    document.getElementById("dataAquisicao").value = ativo.dataAquisicao;
    document.getElementById("garantiaFim").value = ativo.garantiaFim;
    document.getElementById("status").value = ativo.status;
    document.getElementById("ultimaManutencao").value = ativo.ultimaManutencao;
    document.getElementById("observacoes").value = ativo.observacoes;

    // Remover ativo antigo e adicionar novo
    this.ativos = this.ativos.filter((a) => a.id !== id);

    // Alterar texto do botão
    const submitBtn = document.querySelector(
      '#inventoryForm button[type="submit"]'
    );
    submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Atualizar Ativo';
    submitBtn.onclick = (e) => {
      e.preventDefault();
      this.atualizarAtivo(id);
    };

    // Scroll para o formulário
    this.scrollToForm();
  }

  atualizarAtivo(idOriginal) {
    const ativo = {
      id: idOriginal,
      idAtivo: document.getElementById("idAtivo").value,
      patrimonioCIASC: document.getElementById("patrimonioCIASC").value,
      serialNumber: document.getElementById("serialNumber").value,
      hostname: document.getElementById("hostname").value,
      usuarioResponsavel: document.getElementById("usuarioResponsavel").value,
      setorComissao: document.getElementById("setorComissao").value,
      localizacao: document.getElementById("localizacao").value,
      modelo: document.getElementById("modelo").value,
      cpu: document.getElementById("cpu").value,
      ramGB: parseInt(document.getElementById("ramGB").value),
      armazenamentoGB: parseInt(
        document.getElementById("armazenamentoGB").value
      ),
      tipoArmazenamento: document.getElementById("tipoArmazenamento").value,
      sistemaOperacional: document.getElementById("sistemaOperacional").value,
      buildSO: document.getElementById("buildSO").value,
      officeVersao: document.getElementById("officeVersao").value,
      antivirus: document.getElementById("antivirus").value,
      enderecoIP: document.getElementById("enderecoIP").value,
      macAddress: document.getElementById("macAddress").value,
      dataAquisicao: document.getElementById("dataAquisicao").value,
      garantiaFim: document.getElementById("garantiaFim").value,
      status: document.getElementById("status").value,
      ultimaManutencao: document.getElementById("ultimaManutencao").value,
      observacoes: document.getElementById("observacoes").value,
      dataCadastro: new Date().toISOString(),
    };

    this.ativos.push(ativo);
    this.salvarDados();
    this.limparFormulario();
    this.atualizarTabela();
    this.atualizarEstatisticas();

    // Restaurar botão original
    const submitBtn = document.querySelector(
      '#inventoryForm button[type="submit"]'
    );
    submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Salvar Ativo';
    submitBtn.onclick = null;

    this.showAlert("Ativo atualizado com sucesso!", "success");
  }

  excluirAtivo(id) {
    if (confirm("Tem certeza que deseja excluir este ativo?")) {
      this.ativos = this.ativos.filter((a) => a.id !== id);
      this.salvarDados();
      this.atualizarTabela();
      this.atualizarEstatisticas();
      this.showAlert("Ativo excluído com sucesso!", "success");
    }
  }

  visualizarAtivo(id) {
    const ativo = this.ativos.find((a) => a.id === id);
    if (!ativo) return;

    const detalhes = `
      <div class="row">
        <div class="col-md-6">
          <h5><i class="fas fa-info-circle me-2"></i>Informações Básicas</h5>
          <p><strong>ID Ativo:</strong> ${ativo.idAtivo}</p>
          <p><strong>Patrimônio CIASC:</strong> ${ativo.patrimonioCIASC}</p>
          <p><strong>Serial Number:</strong> ${ativo.serialNumber}</p>
          <p><strong>Hostname:</strong> ${ativo.hostname}</p>
          <p><strong>Usuário Responsável:</strong> ${
            ativo.usuarioResponsavel
          }</p>
          <p><strong>Setor/Comissão:</strong> ${ativo.setorComissao}</p>
          <p><strong>Localização:</strong> ${ativo.localizacao}</p>
        </div>
        <div class="col-md-6">
          <h5><i class="fas fa-microchip me-2"></i>Especificações Técnicas</h5>
          <p><strong>Modelo:</strong> ${ativo.modelo}</p>
          <p><strong>CPU:</strong> ${ativo.cpu}</p>
          <p><strong>RAM:</strong> ${ativo.ramGB} GB</p>
          <p><strong>Armazenamento:</strong> ${ativo.armazenamentoGB} GB (${
      ativo.tipoArmazenamento
    })</p>
          <p><strong>Sistema Operacional:</strong> ${
            ativo.sistemaOperacional
          }</p>
          <p><strong>Build SO:</strong> ${ativo.buildSO || "N/A"}</p>
          <p><strong>Office:</strong> ${ativo.officeVersao || "N/A"}</p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <h5><i class="fas fa-shield-alt me-2"></i>Rede e Segurança</h5>
          <p><strong>Antivírus:</strong> ${ativo.antivirus || "N/A"}</p>
          <p><strong>Endereço IP:</strong> ${ativo.enderecoIP || "N/A"}</p>
          <p><strong>MAC Address:</strong> ${ativo.macAddress || "N/A"}</p>
        </div>
        <div class="col-md-6">
          <h5><i class="fas fa-calendar-alt me-2"></i>Gestão</h5>
          <p><strong>Data Aquisição:</strong> ${this.formatarData(
            ativo.dataAquisicao
          )}</p>
          <p><strong>Fim da Garantia:</strong> ${
            ativo.garantiaFim ? this.formatarData(ativo.garantiaFim) : "N/A"
          }</p>
          <p><strong>Status:</strong> <span class="badge bg-${this.getStatusColor(
            ativo.status
          )}">${ativo.status}</span></p>
          <p><strong>Última Manutenção:</strong> ${
            ativo.ultimaManutencao
              ? this.formatarData(ativo.ultimaManutencao)
              : "N/A"
          }</p>
        </div>
      </div>
      ${
        ativo.observacoes
          ? `<div class="row mt-3"><div class="col-12"><h5><i class="fas fa-sticky-note me-2"></i>Observações</h5><p>${ativo.observacoes}</p></div></div>`
          : ""
      }
    `;

    // Criar modal para exibir detalhes
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="fas fa-eye me-2"></i>Detalhes do Ativo - ${ativo.idAtivo}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ${detalhes}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="fas fa-times me-1"></i>Fechar
            </button>
            <button type="button" class="btn btn-primary" onclick="inventario.gerarQRCodeParaAtivo(${ativo.id})">
              <i class="fas fa-qrcode me-1"></i>Gerar QR Code
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.addEventListener("hidden.bs.modal", () => {
      document.body.removeChild(modal);
    });
  }

  filtrarAtivos() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filterSetor = document.getElementById("filterSetor").value;
    const filterStatus = document.getElementById("filterStatus").value;

    const ativosFiltrados = this.ativos.filter((ativo) => {
      const matchSearch =
        !searchTerm ||
        ativo.idAtivo.toLowerCase().includes(searchTerm) ||
        ativo.hostname.toLowerCase().includes(searchTerm) ||
        ativo.usuarioResponsavel.toLowerCase().includes(searchTerm) ||
        ativo.patrimonioCIASC.toLowerCase().includes(searchTerm);
      const matchSetor = !filterSetor || ativo.setorComissao === filterSetor;
      const matchStatus = !filterStatus || ativo.status === filterStatus;

      return matchSearch && matchSetor && matchStatus;
    });

    this.atualizarTabela(ativosFiltrados);
  }

  atualizarTabela(ativos = this.ativos) {
    const tbody = document.getElementById("inventoryTableBody");
    tbody.innerHTML = "";

    if (ativos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center">
            <div class="empty-state">
              <i class="fas fa-search"></i>
              <h5>Nenhum ativo encontrado</h5>
              <p>Tente ajustar os filtros de busca</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    ativos.forEach((ativo) => {
      const row = document.createElement("tr");
      row.className = "fade-in";
      row.innerHTML = `
        <td><strong>${ativo.idAtivo}</strong></td>
        <td>${ativo.patrimonioCIASC}</td>
        <td><code>${ativo.hostname}</code></td>
        <td>${ativo.usuarioResponsavel}</td>
        <td><span class="badge bg-info">${ativo.setorComissao}</span></td>
        <td>${ativo.localizacao}</td>
        <td>${ativo.modelo}</td>
        <td><span class="badge bg-${this.getStatusColor(ativo.status)}">${
        ativo.status
      }</span></td>
        <td>${
          ativo.ultimaManutencao
            ? this.formatarData(ativo.ultimaManutencao)
            : "N/A"
        }</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-sm btn-info me-1" onclick="inventario.visualizarAtivo(${
              ativo.id
            })" title="Visualizar" data-bs-toggle="tooltip">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-warning me-1" onclick="inventario.editarAtivo(${
              ativo.id
            })" title="Editar" data-bs-toggle="tooltip">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="inventario.excluirAtivo(${
              ativo.id
            })" title="Excluir" data-bs-toggle="tooltip">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  atualizarEstatisticas() {
    const totalAtivos = this.ativos.length;
    const ativosAtivos = this.ativos.filter((a) => a.status === "Ativo").length;
    const emManutencao = this.ativos.filter(
      (a) => a.status === "Manutenção"
    ).length;

    const hoje = new Date();
    const garantiaExpirada = this.ativos.filter((a) => {
      if (!a.garantiaFim) return false;
      return new Date(a.garantiaFim) < hoje;
    }).length;

    document.getElementById("totalAtivos").textContent = totalAtivos;
    document.getElementById("ativosAtivos").textContent = ativosAtivos;
    document.getElementById("emManutencao").textContent = emManutencao;
    document.getElementById("garantiaExpirada").textContent = garantiaExpirada;

    // Adicionar animação aos números
    this.animateNumbers();
  }

  animateNumbers() {
    const elements = [
      "totalAtivos",
      "ativosAtivos",
      "emManutencao",
      "garantiaExpirada",
    ];
    elements.forEach((id) => {
      const element = document.getElementById(id);
      const finalValue = parseInt(element.textContent);
      this.animateValue(element, 0, finalValue, 1000);
    });
  }

  animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  limparFormulario() {
    document.getElementById("inventoryForm").reset();

    // Restaurar botão original
    const submitBtn = document.querySelector(
      '#inventoryForm button[type="submit"]'
    );
    submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Salvar Ativo';
    submitBtn.onclick = null;
  }

  salvarDados() {
    localStorage.setItem("inventarioCEE", JSON.stringify(this.ativos));
  }

  exportarCSV() {
    if (this.ativos.length === 0) {
      this.showAlert("Não há dados para exportar!", "warning");
      return;
    }

    const headers = [
      "ID_Ativo",
      "Patrimonio_CIASC",
      "Serial_Number",
      "Hostname",
      "Usuario_Responsavel",
      "Setor_Comissão",
      "Localização",
      "Modelo",
      "CPU",
      "RAM_GB",
      "Armazenamento_GB",
      "Tipo_Armazenamento",
      "Sistema_Operacional",
      "Build_SO",
      "Office_Versão",
      "Antivirus",
      "Endereço_IP",
      "MAC_Address",
      "Data_Aquisição",
      "Garantia_Fim",
      "Status",
      "Ultima_Manutenção",
      "Observações",
    ];

    const csvContent = [
      headers.join(","),
      ...this.ativos.map((ativo) =>
        [
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
          ativo.buildSO || "",
          ativo.officeVersao || "",
          ativo.antivirus || "",
          ativo.enderecoIP || "",
          ativo.macAddress || "",
          ativo.dataAquisicao,
          ativo.garantiaFim || "",
          ativo.status,
          ativo.ultimaManutencao || "",
          ativo.observacoes || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inventario_CEE_SC_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showAlert("Dados exportados com sucesso!", "success");
  }

  gerarQRCode() {
    const idAtivo = document.getElementById("idAtivo").value;
    if (!idAtivo) {
      this.showAlert("Preencha o ID Ativo primeiro!", "warning");
      return;
    }

    const qrData = JSON.stringify({
      id: idAtivo,
      timestamp: new Date().toISOString(),
      source: "CEE-SC Inventário",
    });

    this.showQRCodeModal(qrData, idAtivo);
  }

  gerarQRCodeParaAtivo(id) {
    const ativo = this.ativos.find((a) => a.id === id);
    if (!ativo) return;

    const qrData = JSON.stringify({
      id: ativo.idAtivo,
      patrimonio: ativo.patrimonioCIASC,
      hostname: ativo.hostname,
      usuario: ativo.usuarioResponsavel,
      setor: ativo.setorComissao,
      timestamp: new Date().toISOString(),
      source: "CEE-SC Inventário",
    });

    this.showQRCodeModal(qrData, ativo.idAtivo);
  }

  showQRCodeModal(qrData, idAtivo) {
    const modal = document.getElementById("qrCodeModal");
    const container = document.getElementById("qrCodeContainer");

    // Limpar container
    container.innerHTML = "";

    // Gerar QR Code
    QRCode.toCanvas(
      container,
      qrData,
      {
        width: 200,
        margin: 2,
        color: {
          dark: "#1e3c72",
          light: "#ffffff",
        },
      },
      function (error) {
        if (error) {
          container.innerHTML =
            '<p class="text-danger">Erro ao gerar QR Code</p>';
        }
      }
    );

    // Mostrar modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }

  fazerBackup() {
    const data = {
      ativos: this.ativos,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `backup_inventario_CEE_${new Date().toISOString().split("T")[0]}.json`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fechar modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("backupModal")
    );
    modal.hide();

    this.showAlert("Backup realizado com sucesso!", "success");
  }

  restaurarDados() {
    const fileInput = document.getElementById("restoreFile");
    const file = fileInput.files[0];

    if (!file) {
      this.showAlert("Selecione um arquivo de backup!", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.ativos && Array.isArray(data.ativos)) {
          this.ativos = data.ativos;
          this.salvarDados();
          this.atualizarTabela();
          this.atualizarEstatisticas();

          // Fechar modal
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("restoreModal")
          );
          modal.hide();

          this.showAlert("Dados restaurados com sucesso!", "success");
        } else {
          this.showAlert("Arquivo de backup inválido!", "danger");
        }
      } catch (error) {
        this.showAlert("Erro ao processar arquivo de backup!", "danger");
      }
    };
    reader.readAsText(file);
  }

  showAlert(message, type) {
    // Remover alertas anteriores
    const existingAlerts = document.querySelectorAll(".alert-custom");
    existingAlerts.forEach((alert) => alert.remove());

    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-custom alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    alertDiv.innerHTML = `
      <i class="fas fa-${
        type === "success"
          ? "check-circle"
          : type === "warning"
          ? "exclamation-triangle"
          : "times-circle"
      } me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remover após 5 segundos
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }

  scrollToForm() {
    const formSection = document.getElementById("formSection");
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  formatarData(dataString) {
    if (!dataString) return "N/A";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  }

  getStatusColor(status) {
    switch (status) {
      case "Ativo":
        return "success";
      case "Inativo":
        return "danger";
      case "Manutenção":
        return "warning";
      case "Descartado":
        return "secondary";
      default:
        return "primary";
    }
  }
}

// Funções globais
function limparFormulario() {
  inventario.limparFormulario();
}

function exportarCSV() {
  inventario.exportarCSV();
}

function gerarQRCode() {
  inventario.gerarQRCode();
}

function scrollToForm() {
  inventario.scrollToForm();
}

function showBackupModal() {
  const modal = new bootstrap.Modal(document.getElementById("backupModal"));
  modal.show();
}

function showRestoreModal() {
  const modal = new bootstrap.Modal(document.getElementById("restoreModal"));
  modal.show();
}

function fazerBackup() {
  inventario.fazerBackup();
}

function restaurarDados() {
  inventario.restaurarDados();
}

function downloadQRCode() {
  const canvas = document.querySelector("#qrCodeContainer canvas");
  if (canvas) {
    const link = document.createElement("a");
    link.download = "qrcode_ativo.png";
    link.href = canvas.toDataURL();
    link.click();
  }
}

// Funções do Google Sheets
function showGoogleSheetsModal() {
  const modal = new bootstrap.Modal(
    document.getElementById("googleSheetsModal")
  );
  modal.show();
}

function configurarGoogleSheets() {
  const spreadsheetUrl = document.getElementById("spreadsheetUrl").value;
  const apiKey = document.getElementById("apiKey").value;

  if (!spreadsheetUrl || !apiKey) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Extrair ID da planilha da URL
  const match = spreadsheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) {
    alert("URL da planilha inválida!");
    return;
  }

  const spreadsheetId = match[1];

  try {
    inventario.googleSheets.saveConfiguration(apiKey, spreadsheetId);
    alert("Configuração salva com sucesso!");

    // Fechar modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("googleSheetsModal")
    );
    modal.hide();
  } catch (error) {
    alert("Erro ao salvar configuração: " + error.message);
  }
}

async function testarConexao() {
  const statusDiv = document.getElementById("connectionStatus");
  statusDiv.innerHTML = '<span class="text-warning">Testando conexão...</span>';

  try {
    const success = await inventario.googleSheets.createSheetIfNotExists();
    if (success) {
      statusDiv.innerHTML =
        '<span class="text-success"><i class="fas fa-check-circle"></i> Conexão OK</span>';
    } else {
      statusDiv.innerHTML =
        '<span class="text-danger"><i class="fas fa-times-circle"></i> Erro na conexão</span>';
    }
  } catch (error) {
    statusDiv.innerHTML =
      '<span class="text-danger"><i class="fas fa-times-circle"></i> ' +
      error.message +
      "</span>";
  }
}

async function sincronizarParaGoogleSheets() {
  try {
    await inventario.googleSheets.syncToGoogleSheets(inventario.ativos);
    alert("Dados sincronizados com sucesso para o Google Sheets!");
  } catch (error) {
    alert("Erro ao sincronizar: " + error.message);
  }
}

async function carregarDoGoogleSheets() {
  if (confirm("Isso irá substituir todos os dados atuais. Continuar?")) {
    try {
      const ativos = await inventario.googleSheets.loadFromGoogleSheets();
      inventario.ativos = ativos;
      inventario.salvarDados();
      inventario.atualizarTabela();
      inventario.atualizarEstatisticas();
      alert("Dados carregados com sucesso do Google Sheets!");
    } catch (error) {
      alert("Erro ao carregar dados: " + error.message);
    }
  }
}

function abrirGoogleSheets() {
  const url = inventario.googleSheets.getSpreadsheetUrl();
  if (url) {
    window.open(url, "_blank");
  } else {
    alert("Google Sheets não está configurado!");
  }
}

function limparConfiguracao() {
  if (
    confirm("Tem certeza que deseja limpar a configuração do Google Sheets?")
  ) {
    inventario.googleSheets.saveConfiguration("", "");
    document.getElementById("spreadsheetUrl").value = "";
    document.getElementById("apiKey").value = "";
    alert("Configuração limpa com sucesso!");
  }
}

// Inicializar aplicação
let inventario;
let authSystem;

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar sistema de autenticação primeiro
  authSystem = new AuthSystem();

  // Aguardar um pouco para garantir que a autenticação seja processada
  setTimeout(() => {
    // Só inicializar o inventário se o usuário estiver autenticado
    if (authSystem && authSystem.isUserAuthenticated()) {
      inventario = new InventarioComputadores();

      // Adicionar alguns dados de exemplo se não houver dados
      if (inventario.ativos.length === 0) {
        const dadosExemplo = [
          {
            id: 1,
            idAtivo: "CEE001",
            patrimonioCIASC: "PAT001",
            serialNumber: "SN123456789",
            hostname: "CEE-PC001",
            usuarioResponsavel: "João Silva",
            setorComissao: "Presidência",
            localizacao: "Sala 101",
            modelo: "Dell OptiPlex 7090",
            cpu: "Intel Core i7-10700",
            ramGB: 16,
            armazenamentoGB: 512,
            tipoArmazenamento: "SSD",
            sistemaOperacional: "Windows 10",
            buildSO: "21H2",
            officeVersao: "Office 365",
            antivirus: "Windows Defender",
            enderecoIP: "192.168.1.100",
            macAddress: "00:1B:44:11:3A:B7",
            dataAquisicao: "2023-01-15",
            garantiaFim: "2026-01-15",
            status: "Ativo",
            ultimaManutencao: "2024-01-15",
            observacoes: "Computador em excelente estado",
            dataCadastro: "2024-01-01T10:00:00.000Z",
          },
          {
            id: 2,
            idAtivo: "CEE002",
            patrimonioCIASC: "PAT002",
            serialNumber: "SN987654321",
            hostname: "CEE-PC002",
            usuarioResponsavel: "Maria Santos",
            setorComissao: "Secretaria Executiva",
            localizacao: "Sala 102",
            modelo: "HP EliteDesk 800 G6",
            cpu: "Intel Core i5-10500",
            ramGB: 8,
            armazenamentoGB: 256,
            tipoArmazenamento: "SSD",
            sistemaOperacional: "Windows 11",
            buildSO: "22H2",
            officeVersao: "Office 2019",
            antivirus: "Kaspersky",
            enderecoIP: "192.168.1.101",
            macAddress: "00:1B:44:11:3A:B8",
            dataAquisicao: "2023-03-20",
            garantiaFim: "2026-03-20",
            status: "Ativo",
            ultimaManutencao: "2024-02-10",
            observacoes: "",
            dataCadastro: "2024-01-01T10:00:00.000Z",
          },
        ];

        inventario.ativos = dadosExemplo;
        inventario.salvarDados();
        inventario.atualizarTabela();
        inventario.atualizarEstatisticas();
      }
    }
  }, 100);
});
