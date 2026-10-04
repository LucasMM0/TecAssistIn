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
                <button onclick="editArticle('${art.id}')" class="p-1.5 text-brand-700 hover:bg-slate-100 rounded" title="Editar matéria" aria-label="Editar ${art.title}">
                    <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                </button>
                <button onclick="deleteArticle('${art.id}')" class="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Eliminar notícia" aria-label="Eliminar ${art.title}">
                    <i class="fa-solid fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function openNewArticleModal() {
    document.getElementById('form-new-article').reset();
    document.getElementById('art-id').value = '';
    document.getElementById('modal-article-title-text').innerText = 'Publicar Nova Matéria';
    document.getElementById('btn-save-article').innerText = 'Publicar Matéria';
    toggleModal('modal-new-article');
}

function editArticle(id) {
    const art = state.articles.find(a => a.id === id);
    if (!art) return;

    document.getElementById('art-id').value = art.id;
    document.getElementById('art-title').value = art.title;
    document.getElementById('art-category').value = art.category;
    document.getElementById('art-author').value = art.author;
    document.getElementById('art-image').value = art.image || '';
    document.getElementById('art-image-alt').value = art.imageAlt || '';
    document.getElementById('art-summary').value = art.summary;
    document.getElementById('art-content').value = art.content;

    document.getElementById('modal-article-title-text').innerText = 'Editar Matéria';
    document.getElementById('btn-save-article').innerText = 'Atualizar Matéria';

    toggleModal('modal-new-article');
}

function saveArticle(e) {
    e.preventDefault();
    const id = document.getElementById('art-id').value;
    const title = document.getElementById('art-title').value;
    const category = document.getElementById('art-category').value;
    const author = document.getElementById('art-author').value;
    const image = document.getElementById('art-image').value;
    const imageAlt = document.getElementById('art-image-alt').value;
    const summary = document.getElementById('art-summary').value;
    const content = document.getElementById('art-content').value;

    const categoryLabels = {
        visual: 'Deficiência Visual',
        auditiva: 'Deficiência Auditiva',
        motor: 'Mobilidade',
        software: 'Software & IA'
    };

    if (id) {
        // Atualiza a matéria existente
        const artIndex = state.articles.findIndex(a => a.id === id);
        if (artIndex !== -1) {
            state.articles[artIndex] = {
                ...state.articles[artIndex],
                title,
                category,
                categoryLabel: categoryLabels[category] || 'Geral',
                author,
                image,
                imageAlt,
                summary,
                content
            };
        }
    } else {
        // Cria uma nova matéria
        const newArt = {
            id: Date.now().toString(),
            title,
            category,
            categoryLabel: categoryLabels[category] || 'Geral',
            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
            author,
            summary,
            content,
            image,
            imageAlt,
            featured: false,
            bookmarksCount: 0
        };
        state.articles.unshift(newArt);
    }

    saveStateToStorage();
    toggleModal('modal-new-article');
    document.getElementById('form-new-article').reset();
    renderAdminTable();
    alert(id ? 'Matéria atualizada com sucesso!' : 'Matéria publicada com sucesso!');
}
