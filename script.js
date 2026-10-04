/* INITIAL MOCK DATA (PERSISTED IN LOCALSTORAGE) */
const initialArticles = [
    {
        id: '1',
        title: 'Óculos com Inteligência Artificial descrevem o mundo em tempo real para pessoas cegas',
        category: 'visual',
        categoryLabel: 'Deficiência Visual',
        date: '03 de Outubro, 2026',
        author: 'Mariana Silva',
        summary: 'Dispositivo vestível utiliza visão computacional e áudio direcional para ler cardápios, reconhecer rostos e guiar em transporte público.',
        content: `A evolução da inteligência artificial generativa aliada a câmeras microscópicas permitiu o lançamento de uma nova geração de óculos assistivos. O dispositivo, desenvolvido em parceria com institutos de acessibilidade, captura o ambiente a 60 quadros por segundo e processa informações locais sem depender exclusivamente de conexão à internet.\n\nDurante os testes práticos com mais de 500 voluntários com deficiência visual total e baixa visão, o sistema demonstrou capacidade de alertar sobre obstáculos suspensos, ler placas de sinalização urbana e descrever expressões faciais em interações sociais.\n\n"A tecnologia assistiva finalmente alcançou um nível de naturalidade em que o usuário recebe o contexto sem sobrecarga sensorial", explica a pesquisadora Dra. Helena Ramos. O dispositivo deve chegar ao mercado sul-americano no primeiro trimestre de 2027 com subsídios Governamentais.`,
        image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Pessoa sorrindo utilizando óculos inteligentes pretos com uma pequena câmera acoplada na haste lateral.',
        featured: true,
        bookmarksCount: 42
    },
    {
        id: '2',
        title: 'Novo aplicativo traduz conversas faladas para Língua de Sinais em tempo real via Avatar 3D',
        category: 'auditiva',
        categoryLabel: 'Deficiência Auditiva',
        date: '02 de Outubro, 2026',
        author: 'Carlos Eduardo',
        summary: 'Ferramenta utiliza aprendizado de máquina para adaptar regionalismos e nuances gramaticais da Libras com animação natural.',
        content: `Um consórcio de universidades brasileiras lançou esta semana um aplicativo gratuito focado em quebrar barreiras de comunicação entre pessoas surdas e ouvintes. Diferente de tradutores automáticos anteriores que realizavam substituição palavra por palavra, o novo algoritmo analisa o contexto completo da frase e aplica a estrutura sintática correta da Libras.\n\nO avatar tridimensional conta com mais de 120 pontos de articulação facial, garantindo que as expressões não-manuais — fundamentais para o significado na língua de sinais — sejam transmitidas com precisão. O aplicativo funciona em smartphones intermediários e offline.`,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Mão fazendo sinal em Libras diante de uma tela de smartphone exibindo um modelo tridimensional.',
        featured: false,
        bookmarksCount: 28
    },
    {
        id: '3',
        title: 'Exoesqueleto robótico de baixo custo obtém certificação para uso residencial e clínico',
        category: 'motor',
        categoryLabel: 'Mobilidade',
        date: '01 de Outubro, 2026',
        author: 'Juliana Mendes',
        summary: 'Equipamento leve em fibra de carbono permite que pessoas com paraplegia caminhem e subam degraus com autonomia de 8 horas.',
        content: `A Agência Nacional de Vigilância Sanitária aprovou o uso comercial de um novo exoesqueleto motorizado projetado para pessoas com lesão medular ou fraqueza muscular severa. Com peso inferior a 14 quilos, a estrutura ajustável pode ser vestida em menos de três minutos sem ajuda de terceiros.\n\nOs motores integrados nas articulações do quadril e joelhos utilizam sensores de inclinação de tronco para antecipar a intenção de movimento do usuário. O grande diferencial está no custo, até 70% menor em comparação aos modelos importados da Europa.`,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Detalhe de estrutura robótica acoplada às pernas de uma pessoa que caminha com o auxílio de muletas de apoio.',
        featured: false,
        bookmarksCount: 65
    },
    {
        id: '4',
        title: 'W3C atualiza diretrizes WCAG 3.0 com foco em neurodiversidade e interfaces cognitivas',
        category: 'software',
        categoryLabel: 'Software & IA',
        date: '28 de Setembro, 2026',
        author: 'Lucas Freitas',
        summary: 'Novas recomendações internacionais incluem padrões para redução de sobrecarga sensorial, navegação preditiva e simplificação textual.',
        content: `O World Wide Web Consortium (W3C) apresentou a minuta atualizada das Diretrizes de Acessibilidade para Conteúdo Web (WCAG 3.0). Pela primeira vez, os critérios de avaliação dedicam uma seção inteira a usuários com TDAH, autismo, dislexia e deficiências de processamento cognitivo.\n\nAs novas diretrizes recomendam modos de leitura sem elementos flutuantes, opção nativa para simplificação de vocabulário técnico e temporizadores ajustáveis para formulários. Desenvolvedores de todo o mundo têm até o fim do ano para enviar contribuições públicas.`,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Tela de computador exibindo códigos de programação e um diagrama acessível de fluxo de dados.',
        featured: false,
        bookmarksCount: 19
    }
];

/* APP STATE MANAGEMENT */
let state = {
    articles: JSON.parse(localStorage.getItem('tecassistin_articles')) || initialArticles,
    currentUser: JSON.parse(localStorage.getItem('tecassistin_user')) || { role: 'guest', name: 'Visitante' },
    currentCategory: 'all',
    activeView: 'home',
    currentArticleId: null,
    highContrast: false,
    dyslexicFont: false,
    fontSize: 'md',
    isSpeaking: false
};

/* INITIALIZATION */
window.addEventListener('DOMContentLoaded', () => {
    saveStateToStorage();
    renderAuthButton();
    renderHero();
    renderArticlesGrid();
    initSpeechSynthesis();
});

function saveStateToStorage() {
    localStorage.setItem('tecassistin_articles', JSON.stringify(state.articles));
    localStorage.setItem('tecassistin_user', JSON.stringify(state.currentUser));
}

/* NAVIGATION & VIEWS */
function navigateTo(viewName, articleId = null) {
    stopSpeech();
    state.activeView = viewName;
    state.currentArticleId = articleId;

    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

    if (viewName === 'home') {
        document.getElementById('view-home').classList.remove('hidden');
        renderHero();
        renderArticlesGrid();
    } else if (viewName === 'article' && articleId) {
        document.getElementById('view-article').classList.remove('hidden');
        renderArticleDetail(articleId);
    } else if (viewName === 'admin') {
        if (state.currentUser.role !== 'admin') {
            alert('Acesso restrito a administradores do portal.');
            navigateTo('home');
            return;
        }
        document.getElementById('view-admin').classList.remove('hidden');
        renderAdminTable();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* AUTH & USER ROLES */
function renderAuthButton() {
    const container = document.getElementById('auth-button-container');
    if (state.currentUser.role === 'admin') {
        container.innerHTML = `
            <div class="flex items-center space-x-2">
                <button onclick="navigateTo('admin')" class="px-3 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold rounded-lg text-xs hover:bg-amber-200 focus:ring-2 focus:ring-amber-600 flex items-center gap-1.5">
                    <i class="fa-solid fa-user-shield" aria-hidden="true"></i>
                    <span class="hidden sm:inline">Painel Admin</span>
                </button>
                <button onclick="logout()" class="p-1.5 text-slate-500 hover:text-red-600 text-xs font-semibold" title="Sair do modo admin">
                    <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                </button>
            </div>
        `;
    } else if (state.currentUser.role === 'reader') {
        container.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">Leitor Conectado</span>
                <button onclick="logout()" class="p-1.5 text-slate-500 hover:text-red-600 text-xs" title="Sair da conta">
                    <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                </button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button onclick="toggleModal('modal-auth')" class="px-4 py-2 bg-brand-700 text-white font-bold rounded-lg hover:bg-brand-800 text-xs sm:text-sm focus:ring-2 focus:ring-brand-700 shadow-sm flex items-center gap-2">
                <i class="fa-solid fa-user" aria-hidden="true"></i>
                <span>Entrar</span>
            </button>
        `;
    }
}

function loginAs(role) {
    if (role === 'admin') {
        state.currentUser = { role: 'admin', name: 'Administrador TecAssistIn' };
    } else {
        state.currentUser = { role: 'reader', name: 'Leitor' };
    }
    saveStateToStorage();
    renderAuthButton();
    toggleModal('modal-auth');
    if (role === 'admin') navigateTo('admin');
}

function logout() {
    state.currentUser = { role: 'guest', name: 'Visitante' };
    saveStateToStorage();
    renderAuthButton();
    navigateTo('home');
}

/* RENDER HERO ARTICLE */
function renderHero() {
    const container = document.getElementById('hero-section');
    const featured = state.articles.find(a => a.featured) || state.articles[0];

    if (!featured) return;

    container.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 card-bg hover:shadow-md transition">
            <div class="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px]">
                <img src="${featured.image}" alt="${featured.imageAlt}" class="w-full h-full object-cover">
                <span class="absolute top-4 left-4 bg-brand-800 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md">
                    ${featured.categoryLabel}
                </span>
            </div>
            <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div class="space-y-3">
                    <div class="flex items-center text-xs text-slate-500 space-x-3">
                        <span><i class="fa-regular fa-calendar mr-1" aria-hidden="true"></i>${featured.date}</span>
                        <span>•</span>
                        <span>Por <strong>${featured.author}</strong></span>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight hover:text-brand-700">
                        <a href="#" onclick="navigateTo('article', '${featured.id}')">${featured.title}</a>
                    </h2>
                    <p class="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">${featured.summary}</p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button onclick="navigateTo('article', '${featured.id}')" class="px-5 py-2.5 bg-brand-700 text-white font-bold rounded-lg hover:bg-brand-800 text-sm focus:ring-2 focus:ring-brand-700 flex items-center gap-2">
                        <span>Ler Matéria Completa</span>
                        <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                    </button>
                    <span class="text-xs text-slate-500 font-semibold flex items-center gap-1">
                        <i class="fa-regular fa-bookmark text-brand-700" aria-hidden="true"></i> ${featured.bookmarksCount || 0} leitores salvaram
                    </span>
                </div>
            </div>
        </div>
    `;
}

/* RENDER ARTICLES GRID */
function renderArticlesGrid() {
    const grid = document.getElementById('articles-grid');
    let filtered = state.articles;

    if (state.currentCategory !== 'all') {
        filtered = state.articles.filter(a => a.category === state.currentCategory);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200">
                <i class="fa-solid fa-folder-open text-4xl text-slate-300 mb-2" aria-hidden="true"></i>
                <p class="text-slate-600 font-bold">Nenhuma notícia encontrada nesta categoria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(art => `
        <article class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col card-bg hover:shadow-md transition">
            <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="${art.image}" alt="${art.imageAlt}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
                <span class="absolute top-3 left-3 bg-brand-800 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    ${art.categoryLabel}
                </span>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                    <span class="text-xs text-slate-500 block"><i class="fa-regular fa-calendar mr-1" aria-hidden="true"></i>${art.date}</span>
                    <h3 class="text-lg font-bold text-slate-900 leading-snug hover:text-brand-700">
                        <a href="#" onclick="navigateTo('article', '${art.id}')">${art.title}</a>
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed line-clamp-3">${art.summary}</p>
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="text-slate-500">Por <strong>${art.author}</strong></span>
                    <button onclick="navigateTo('article', '${art.id}')" class="font-bold text-brand-700 hover:underline flex items-center gap-1">
                        Ler mais <i class="fa-solid fa-chevron-right text-[10px]" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

/* FILTER CATEGORIES */
function filterCategory(cat) {
    state.currentCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.remove('bg-brand-700', 'text-white');
        btn.classList.add('bg-white', 'text-slate-700');
    });
    renderArticlesGrid();
    navigateTo('home');
}

/* RENDER ARTICLE DETAIL */
function renderArticleDetail(id) {
    const article = state.articles.find(a => a.id === id);
    if (!article) return;

    const container = document.getElementById('article-detail-content');
    const paragraphs = article.content.split('\n\n').map(p => `<p class="leading-relaxed text-slate-800 text-base sm:text-lg mb-4">${p}</p>`).join('');

    container.innerHTML = `
        <header class="space-y-4 border-b border-slate-200 pb-6">
            <span class="inline-block px-3 py-1 bg-brand-100 text-brand-800 font-bold text-xs uppercase rounded">
                ${article.categoryLabel}
            </span>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">${article.title}</h1>
            <div class="flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500 gap-2 pt-2">
                <div>
                    <span>Por <strong>${article.author}</strong></span> • 
                    <span>Publicado em ${article.date}</span>
                </div>

                <!-- Speech Reader & Bookmark Buttons -->
                <div class="flex items-center space-x-2">
                    <button onclick="speakArticle()" id="btn-tts" class="px-3 py-1.5 bg-brand-700 text-white font-bold rounded-lg text-xs hover:bg-brand-800 flex items-center gap-2 focus:ring-2 focus:ring-brand-700 shadow-sm">
                        <i class="fa-solid fa-volume-high" aria-hidden="true"></i>
                        <span id="tts-label">Ouvir Notícia</span>
                    </button>
                    <button onclick="bookmarkArticle('${article.id}')" class="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5">
                        <i class="fa-regular fa-bookmark text-brand-700" aria-hidden="true"></i>
                        <span>Salvar</span>
                    </button>
                </div>
            </div>
        </header>

        <figure class="my-6">
            <img src="${article.image}" alt="${article.imageAlt}" class="w-full h-80 object-cover rounded-xl border border-slate-200">
            <figcaption class="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded border border-slate-200 flex items-center gap-1">
                <i class="fa-solid fa-eye text-brand-700" aria-hidden="true"></i>
                <span><strong>Descrição da Imagem:</strong> ${article.imageAlt}</span>
            </figcaption>
        </figure>

        <div id="article-text-body" class="prose prose-slate max-w-none">
            ${paragraphs}
        </div>

        <!-- COMMENTS SECTION -->
        <section class="border-t border-slate-200 pt-8 mt-10 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-comments text-brand-700" aria-hidden="true"></i> Comentários e Contribuições
            </h2>

            <div class="space-y-3">
                <textarea id="comment-input" rows="3" class="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-brand-700" placeholder="Deixe seu comentário acessível..."></textarea>
                <button onclick="addComment()" class="px-4 py-2 bg-brand-700 text-white font-bold rounded-lg text-xs hover:bg-brand-800">Enviar Comentário</button>
            </div>

            <div id="comments-list" class="space-y-4 pt-4">
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-bold text-slate-900">Ana Souza</span>
                        <span class="text-slate-400">Há 2 horas</span>
                    </div>
                    <p class="text-xs text-slate-700">Excelente iniciativa! É fundamental que as inovações em tecnologia assistiva sejam divulgadas com clareza e acessibilidade.</p>
                </div>
            </div>
        </section>
    `;
}

/* TEXT TO SPEECH (WEB SPEECH API) */
let synth = window.speechSynthesis;
let utterance = null;

function initSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
        console.warn('Sintetizador de voz não suportado neste navegador.');
    }
}

function speakArticle() {
    if (state.isSpeaking) {
        synth.cancel();
        state.isSpeaking = false;
        document.getElementById('tts-label').innerText = 'Ouvir Notícia';
        document.getElementById('btn-tts').classList.remove('bg-red-600');
        document.getElementById('btn-tts').classList.add('bg-brand-700');
        return;
    }

    const article = state.articles.find(a => a.id === state.currentArticleId);
    if (!article) return;

    const textToRead = `${article.title}. Por ${article.author}. ${article.summary}. ${article.content}`;
    utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    utterance.onend = () => {
        state.isSpeaking = false;
        document.getElementById('tts-label').innerText = 'Ouvir Notícia';
        document.getElementById('btn-tts').classList.remove('bg-red-600');
        document.getElementById('btn-tts').classList.add('bg-brand-700');
    };

    synth.speak(utterance);
    state.isSpeaking = true;
    document.getElementById('tts-label').innerText = 'Pausar Áudio';
    document.getElementById('btn-tts').classList.remove('bg-brand-700');
    document.getElementById('btn-tts').classList.add('bg-red-600');
}

function stopSpeech() {
    if (synth && state.isSpeaking) {
        synth.cancel();
        state.isSpeaking = false;
    }
}

/* ADMIN FUNCTIONS */
function renderAdminTable() {
    const tbody = document.getElementById('admin-articles-list');
    tbody.innerHTML = state.articles.map(art => `
        <tr class="hover:bg-slate-50">
            <td class="p-3 font-semibold text-slate-900">${art.title}</td>
            <td class="p-3"><span class="px-2 py-0.5 bg-slate-100 rounded text-xs font-bold text-slate-700">${art.categoryLabel}</span></td>
            <td class="p-3 text-xs text-slate-500">${art.date}</td>
            <td class="p-3"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs font-bold">Publicado</span></td>
            <td class="p-3 text-right space-x-2">
                <button onclick="deleteArticle('${art.id}')" class="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Excluir notícia" aria-label="Excluir ${art.title}">
                    <i class="fa-solid fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function openNewArticleModal() {
    toggleModal('modal-new-article');
}

function saveArticle(e) {
    e.preventDefault();
    const title = document.getElementById('art-title').value;
    const category = document.getElementById('art-category').value;
    const author = document.getElementById('art-author').value;
    const summary = document.getElementById('art-summary').value;
    const content = document.getElementById('art-content').value;
    const imageAlt = document.getElementById('art-image-alt').value;

    const categoryLabels = {
        visual: 'Deficiência Visual',
        auditiva: 'Deficiência Auditiva',
        motor: 'Mobilidade',
        software: 'Software & IA'
    };

    const newArt = {
        id: Date.now().toString(),
        title,
        category,
        categoryLabel: categoryLabels[category] || 'Geral',
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
        author,
        summary,
        content,
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        imageAlt,
        featured: false,
        bookmarksCount: 0
    };

    state.articles.unshift(newArt);
    saveStateToStorage();
    toggleModal('modal-new-article');
    document.getElementById('form-new-article').reset();
    renderAdminTable();
    alert('Matéria publicada com sucesso!');
}

function deleteArticle(id) {
    if (confirm('Tem certeza que deseja remover esta publicação?')) {
        state.articles = state.articles.filter(a => a.id !== id);
        saveStateToStorage();
        renderAdminTable();
    }
}

/* ACCESSIBILITY CONTROLS */
function changeFontSize(size) {
    document.documentElement.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    document.documentElement.classList.add(`font-scale-${size}`);
    state.fontSize = size;
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    state.highContrast = !state.highContrast;
}

function toggleDyslexicFont() {
    document.body.classList.toggle('dyslexic-mode');
    state.dyslexicFont = !state.dyslexicFont;
}

/* UTILITY MODALS & SEARCH */
function toggleModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.toggle('hidden');
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function toggleSearchModal() {
    toggleModal('modal-search');
    if (!document.getElementById('modal-search').classList.contains('hidden')) {
        setTimeout(() => document.getElementById('search-input').focus(), 100);
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }

    const matches = state.articles.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.summary.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        resultsContainer.innerHTML = `<p class="text-xs text-slate-500 py-2">Nenhum resultado para "${query}"</p>`;
        return;
    }

    resultsContainer.innerHTML = matches.map(m => `
        <a href="#" onclick="navigateTo('article', '${m.id}'); toggleSearchModal();" class="block p-3 hover:bg-slate-100 rounded-lg transition border border-slate-100">
            <span class="text-xs font-bold text-brand-700 block">${m.categoryLabel}</span>
            <span class="font-bold text-slate-900 text-sm block">${m.title}</span>
        </a>
    `).join('');
}

function bookmarkArticle(id) {
    const art = state.articles.find(a => a.id === id);
    if (art) {
        art.bookmarksCount = (art.bookmarksCount || 0) + 1;
        saveStateToStorage();
        alert('Notícia salva nos seus favoritos!');
    }
}

function addComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;

    const list = document.getElementById('comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1';
    newComment.innerHTML = `
        <div class="flex justify-between items-center text-xs">
            <span class="font-bold text-slate-900">${state.currentUser.name}</span>
            <span class="text-slate-400">Agora mesmo</span>
        </div>
        <p class="text-xs text-slate-700">${input.value}</p>
    `;
    list.prepend(newComment);
    input.value = '';
}
