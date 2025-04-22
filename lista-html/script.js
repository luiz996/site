window.onload = function() {
    const livrosLista = document.getElementById("livros-lista");
    const form = document.getElementById("book-form");
    const cancelarButton = document.getElementById("cancelar");
    
    let livros = [];
    let editIndex = -1;

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const autor = document.getElementById("autor").value.trim();
        const ano = document.getElementById("ano").value.trim();
        const paginas = document.getElementById("paginas").value.trim();

        if (editIndex === -1) {
            const livro = { nome, autor, ano, paginas };
            livros.push(livro);
        } else {
            livros[editIndex] = { nome, autor, ano, paginas };
            editIndex = -1;
        }

        renderLivros();
        clearForm();
    });

    cancelarButton.addEventListener("click", function() {
        clearForm();
        editIndex = -1;
    });

    function renderLivros() {
        livrosLista.innerHTML = ""; 

        livros.forEach((livro, index) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `${livro.nome} - ${livro.autor} (${livro.ano}) - ${livro.paginas} páginas
                <div>
                    <button class="rename btn btn-warning btn-sm" onclick="editarLivro(${index})">Renomear</button>
                    <button class="delete btn btn-danger btn-sm" onclick="deletarLivro(${index})">Excluir</button>
                </div>`;

            livrosLista.appendChild(li);
        });
    }

    window.editarLivro = function(index) {
        const livro = livros[index];
        document.getElementById("nome").value = livro.nome;
        document.getElementById("autor").value = livro.autor;
        document.getElementById("ano").value = livro.ano;
        document.getElementById("paginas").value = livro.paginas;

        editIndex = index;
    };

    window.deletarLivro = function(index) {
        livros.splice(index, 1); 
        renderLivros(); 
    };

    function clearForm() {
        document.getElementById("nome").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("paginas").value = "";
    }
    renderLivros();
};
