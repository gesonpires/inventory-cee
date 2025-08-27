// Sistema de Autenticação - CEE-SC Inventário
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.allowedDomain = "@sed.sc.gov.br";
    this.init();
  }

  init() {
    // Verificar se há usuário logado
    this.checkAuthStatus();

    // Mostrar tela de login se não estiver autenticado
    if (!this.isAuthenticated) {
      this.showLoginScreen();
    } else {
      this.showMainApplication();
    }
  }

  checkAuthStatus() {
    const savedUser = localStorage.getItem("ceeAuthUser");
    const authToken = localStorage.getItem("ceeAuthToken");
    const tokenExpiry = localStorage.getItem("ceeAuthExpiry");

    if (savedUser && authToken && tokenExpiry) {
      // Verificar se o token não expirou
      if (new Date().getTime() < parseInt(tokenExpiry)) {
        this.currentUser = JSON.parse(savedUser);
        this.isAuthenticated = true;
        return true;
      } else {
        // Token expirado, limpar dados
        this.logout();
      }
    }
    return false;
  }

  validateEmail(email) {
    // Validar formato de email e domínio permitido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Formato de email inválido" };
    }

    if (!email.toLowerCase().endsWith(this.allowedDomain.toLowerCase())) {
      return {
        valid: false,
        message: `Apenas emails do domínio ${this.allowedDomain} são permitidos`,
      };
    }

    return { valid: true, message: "Email válido" };
  }

  async login(email, password) {
    try {
      // Validar email
      const emailValidation = this.validateEmail(email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.message);
      }

      // Simular autenticação (em produção, isso seria uma chamada para API)
      const user = await this.authenticateUser(email, password);

      if (user) {
        this.currentUser = user;
        this.isAuthenticated = true;

        // Salvar dados de autenticação
        const tokenExpiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 horas
        localStorage.setItem("ceeAuthUser", JSON.stringify(user));
        localStorage.setItem("ceeAuthToken", this.generateToken());
        localStorage.setItem("ceeAuthExpiry", tokenExpiry.toString());

        this.hideLoginScreen();
        this.showMainApplication();
        this.updateUserInterface();

        return { success: true, message: "Login realizado com sucesso!" };
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async register(email, password, confirmPassword, nome, cargo) {
    try {
      // Validar email
      const emailValidation = this.validateEmail(email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.message);
      }

      // Validar senha
      if (password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      // Validar campos obrigatórios
      if (!nome.trim() || !cargo.trim()) {
        throw new Error("Nome e cargo são obrigatórios");
      }

      // Simular registro (em produção, isso seria uma chamada para API)
      const user = await this.registerUser(email, password, nome, cargo);

      if (user) {
        // Fazer login automaticamente após registro
        return await this.login(email, password);
      } else {
        throw new Error("Erro ao criar conta");
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async authenticateUser(email, password) {
    // Simular autenticação - em produção, isso seria uma API real
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular verificação de credenciais
        const users = JSON.parse(localStorage.getItem("ceeUsers") || "[]");
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          resolve({
            id: user.id,
            email: user.email,
            nome: user.nome,
            cargo: user.cargo,
            dataRegistro: user.dataRegistro,
            ultimoAcesso: new Date().toISOString(),
          });
        } else {
          resolve(null);
        }
      }, 1000); // Simular delay de rede
    });
  }

  async registerUser(email, password, nome, cargo) {
    // Simular registro - em produção, isso seria uma API real
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("ceeUsers") || "[]");

        // Verificar se email já existe
        if (users.find((u) => u.email === email)) {
          resolve(null);
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          email: email,
          password: password, // Em produção, seria hash da senha
          nome: nome,
          cargo: cargo,
          dataRegistro: new Date().toISOString(),
          ultimoAcesso: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem("ceeUsers", JSON.stringify(users));

        resolve({
          id: newUser.id,
          email: newUser.email,
          nome: newUser.nome,
          cargo: newUser.cargo,
          dataRegistro: newUser.dataRegistro,
          ultimoAcesso: newUser.ultimoAcesso,
        });
      }, 1000); // Simular delay de rede
    });
  }

  generateToken() {
    // Gerar token simples - em produção, seria JWT
    return (
      "token_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;

    // Limpar dados de autenticação
    localStorage.removeItem("ceeAuthUser");
    localStorage.removeItem("ceeAuthToken");
    localStorage.removeItem("ceeAuthExpiry");

    this.showLoginScreen();
    this.hideMainApplication();
  }

  showLoginScreen() {
    // Criar e mostrar tela de login se não existir
    if (!document.getElementById("authContainer")) {
      this.createAuthInterface();
    }

    const authContainer = document.getElementById("authContainer");
    const mainApp = document.getElementById("mainApplication");

    if (authContainer) {
      authContainer.style.display = "flex";
    }

    if (mainApp) {
      mainApp.style.display = "none";
    }
  }

  hideLoginScreen() {
    const authContainer = document.getElementById("authContainer");
    if (authContainer) {
      authContainer.style.display = "none";
    }
  }

  showMainApplication() {
    const mainApp = document.getElementById("mainApplication");
    if (mainApp) {
      mainApp.style.display = "block";
    }
  }

  hideMainApplication() {
    const mainApp = document.getElementById("mainApplication");
    if (mainApp) {
      mainApp.style.display = "none";
    }
  }

  createAuthInterface() {
    const authHTML = `
            <div id="authContainer" class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <div class="logo-container mb-3">
                            <img src="logo.svg" alt="CEE-SC Logo" class="auth-logo" />
                        </div>
                        <h2>Sistema de Inventário</h2>
                        <h5>CONSELHO ESTADUAL DE EDUCAÇÃO - CEE-SC</h5>
                        <p class="text-muted">Acesso restrito ao domínio @sed.sc.gov.br</p>
                    </div>

                    <div class="auth-tabs">
                        <button class="auth-tab active" onclick="switchAuthTab('login')">
                            <i class="fas fa-sign-in-alt me-2"></i>Login
                        </button>
                        <button class="auth-tab" onclick="switchAuthTab('register')">
                            <i class="fas fa-user-plus me-2"></i>Registro
                        </button>
                    </div>

                    <!-- Login Form -->
                    <div id="loginForm" class="auth-form">
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">
                                <i class="fas fa-envelope me-2"></i>Email
                            </label>
                            <input type="email" class="form-control" id="loginEmail" 
                                   placeholder="seu.email@sed.sc.gov.br" required>
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">
                                <i class="fas fa-lock me-2"></i>Senha
                            </label>
                            <input type="password" class="form-control" id="loginPassword" 
                                   placeholder="Sua senha" required>
                        </div>
                        <button type="button" class="btn btn-primary w-100" onclick="handleLogin()">
                            <i class="fas fa-sign-in-alt me-2"></i>Entrar
                        </button>
                    </div>

                    <!-- Register Form -->
                    <div id="registerForm" class="auth-form" style="display: none;">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="registerNome" class="form-label">
                                    <i class="fas fa-user me-2"></i>Nome Completo
                                </label>
                                <input type="text" class="form-control" id="registerNome" 
                                       placeholder="Seu nome completo" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="registerCargo" class="form-label">
                                    <i class="fas fa-briefcase me-2"></i>Cargo/Função
                                </label>
                                <input type="text" class="form-control" id="registerCargo" 
                                       placeholder="Seu cargo ou função" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="registerEmail" class="form-label">
                                    <i class="fas fa-envelope me-2"></i>Email
                                </label>
                                <input type="email" class="form-control" id="registerEmail" 
                                       placeholder="seu.email@sed.sc.gov.br" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="registerPassword" class="form-label">
                                    <i class="fas fa-lock me-2"></i>Senha
                                </label>
                                <input type="password" class="form-control" id="registerPassword" 
                                       placeholder="Mínimo 6 caracteres" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="registerConfirmPassword" class="form-label">
                                    <i class="fas fa-lock me-2"></i>Confirmar Senha
                                </label>
                                <input type="password" class="form-control" id="registerConfirmPassword" 
                                       placeholder="Confirme sua senha" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="button" class="btn btn-success w-100" onclick="handleRegister()">
                                    <i class="fas fa-user-plus me-2"></i>Criar Conta
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="authMessage" class="auth-message"></div>
                </div>
            </div>
        `;

    // Inserir no início do body
    document.body.insertAdjacentHTML("afterbegin", authHTML);
  }

  updateUserInterface() {
    // Atualizar interface com informações do usuário
    const userInfo = document.getElementById("userInfo");
    if (userInfo && this.currentUser) {
      userInfo.innerHTML = `
                <div class="user-info">
                    <i class="fas fa-user-circle me-2"></i>
                    <span>${this.currentUser.nome}</span>
                    <small class="text-muted d-block">${this.currentUser.cargo}</small>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            `;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }
}

// Funções globais para autenticação
function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTab = document.querySelector(".auth-tab:first-child");
  const registerTab = document.querySelector(".auth-tab:last-child");

  if (tab === "login") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
  }

  // Limpar mensagens
  document.getElementById("authMessage").innerHTML = "";
}

async function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const messageDiv = document.getElementById("authMessage");

  if (!email || !password) {
    messageDiv.innerHTML =
      '<div class="alert alert-warning">Preencha todos os campos</div>';
    return;
  }

  messageDiv.innerHTML = '<div class="alert alert-info">Entrando...</div>';

  const result = await authSystem.login(email, password);

  if (result.success) {
    messageDiv.innerHTML =
      '<div class="alert alert-success">' + result.message + "</div>";
    setTimeout(() => {
      messageDiv.innerHTML = "";
    }, 2000);
  } else {
    messageDiv.innerHTML =
      '<div class="alert alert-danger">' + result.message + "</div>";
  }
}

async function handleRegister() {
  const nome = document.getElementById("registerNome").value;
  const cargo = document.getElementById("registerCargo").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;
  const messageDiv = document.getElementById("authMessage");

  if (!nome || !cargo || !email || !password || !confirmPassword) {
    messageDiv.innerHTML =
      '<div class="alert alert-warning">Preencha todos os campos</div>';
    return;
  }

  messageDiv.innerHTML = '<div class="alert alert-info">Criando conta...</div>';

  const result = await authSystem.register(
    email,
    password,
    confirmPassword,
    nome,
    cargo
  );

  if (result.success) {
    messageDiv.innerHTML =
      '<div class="alert alert-success">' + result.message + "</div>";
    setTimeout(() => {
      messageDiv.innerHTML = "";
    }, 2000);
  } else {
    messageDiv.innerHTML =
      '<div class="alert alert-danger">' + result.message + "</div>";
  }
}

function handleLogout() {
  if (confirm("Tem certeza que deseja sair?")) {
    authSystem.logout();
  }
}

// Exportar para uso global
window.AuthSystem = AuthSystem;
