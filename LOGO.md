# Logo CEE-SC - Documentação

## 📋 Visão Geral

A logo personalizada do **CONSELHO ESTADUAL DE EDUCAÇÃO DE SANTA CATARINA (CEE-SC)** foi criada especificamente para o sistema de inventário de computadores, mantendo a identidade visual institucional e transmitindo profissionalismo e modernidade.

## 🎨 Design e Conceito

### **Elementos Visuais**
- **Ícone de Computador/Laptop**: Representa a tecnologia e o foco em TI
- **Design Minimalista**: Sem texto, foco no ícone limpo e moderno
- **Gradiente Azul**: Cores institucionais do CEE-SC (#1e3c72 → #2a5298)
- **Acento Laranja**: Cor de destaque (#f39c12) para elementos interativos
- **Indicador Verde**: Status ativo (#27ae60) para mostrar funcionalidade

### **Filosofia do Design**
- **Simplicidade**: Design limpo sem elementos desnecessários
- **Reconhecibilidade**: Ícone claro e fácil de identificar
- **Escalabilidade**: Funciona bem em diferentes tamanhos
- **Modernidade**: Estilo contemporâneo e profissional

## 📁 Arquivos da Logo

### **1. logo.svg** (120x80px)
- **Uso**: Header principal do sistema
- **Características**: Logo minimalista com apenas ícone
- **Formato**: SVG vetorial (escalável)
- **Cores**: Gradiente azul institucional

### **2. logo-simple.svg** (60x60px)
- **Uso**: Favicon, floating button, contextos pequenos
- **Características**: Versão circular minimalista
- **Formato**: SVG vetorial (escalável)
- **Cores**: Mesmo gradiente institucional

## 🎯 Implementação

### **HTML**
```html
<!-- Logo principal no header -->
<div class="logo-container mb-3">
  <img src="logo.svg" alt="CEE-SC Logo" class="main-logo" />
</div>

<!-- Logo simplificada no floating button -->
<img src="logo-simple.svg" alt="CEE-SC" class="floating-logo" />
```

### **CSS**
```css
/* Logo principal */
.main-logo {
  height: 80px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: var(--transition);
}

/* Logo simplificada */
.logo-simple {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Floating logo */
.floating-logo {
  width: 35px;
  height: 35px;
  filter: brightness(0) invert(1);
}
```

## 📱 Responsividade

### **Desktop (>768px)**
- Logo principal: 80px altura
- Logo simples: 40px altura

### **Tablet (768px)**
- Logo principal: 60px altura
- Logo simples: 30px altura

### **Mobile (<576px)**
- Logo principal: 50px altura
- Logo simples: 25px altura

## 🎨 Cores Utilizadas

### **Cores Principais**
- **Azul Primário**: `#1e3c72`
- **Azul Secundário**: `#2a5298`
- **Laranja Acento**: `#f39c12`
- **Verde Status**: `#27ae60`

### **Gradientes**
- **Fundo**: `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`
- **Ícone**: `linear-gradient(135deg, #f39c12 0%, #e67e22 100%)`

## 🔧 Personalização

### **Alterar Cores**
Para alterar as cores da logo, edite as variáveis CSS:

```css
:root {
  --primary-color: #1e3c72;    /* Azul principal */
  --secondary-color: #2a5298;  /* Azul secundário */
  --accent-color: #f39c12;     /* Laranja acento */
}
```

### **Alterar Tamanhos**
Para alterar os tamanhos, modifique as classes CSS:

```css
.main-logo {
  height: 80px;  /* Altura da logo principal */
}

.logo-simple {
  height: 40px;  /* Altura da logo simples */
}
```

## 📋 Especificações Técnicas

### **Formato SVG**
- **Vantagens**: Escalável, leve, editável
- **Compatibilidade**: Todos os navegadores modernos
- **Tamanho**: ~2-5KB por arquivo

### **Favicon**
- **Arquivo**: `logo-simple.svg`
- **Tamanho**: 60x60px
- **Formato**: SVG para melhor qualidade

## 🎯 Uso Recomendado

### **Logo Principal (logo.svg)**
- ✅ Header do sistema
- ✅ Relatórios impressos
- ✅ Documentação oficial
- ✅ Apresentações

### **Logo Simplificada (logo-simple.svg)**
- ✅ Favicon do navegador
- ✅ Floating action button
- ✅ Contextos pequenos
- ✅ Ícones de sistema

## 🔒 Direitos e Uso

### **Propriedade**
- **Instituição**: CONSELHO ESTADUAL DE EDUCAÇÃO - CEE-SC
- **Sistema**: Inventário de Computadores
- **Ano**: 2024

### **Restrições**
- ❌ Não usar para fins comerciais
- ❌ Não alterar cores sem autorização
- ❌ Não usar fora do contexto institucional

### **Permissões**
- ✅ Uso interno do CEE-SC
- ✅ Sistema de inventário
- ✅ Documentação oficial
- ✅ Comunicação institucional

## 📞 Suporte

Para dúvidas sobre a logo ou solicitar modificações:
- **Equipe de TI**: CEE-SC
- **Sistema**: Inventário de Computadores
- **Versão**: 2.0 (Minimalista)

---

**Desenvolvido para o CONSELHO ESTADUAL DE EDUCAÇÃO DE SANTA CATARINA (CEE-SC)**
