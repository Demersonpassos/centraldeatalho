document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".texto");
    const searchInput = document.getElementById("search-input");
    const suggestionsContainer = document.getElementById("suggestions-container");
    const showAllButton = document.getElementById("show-all-button");

    // Função de busca com sugestões enquanto o usuário digita
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = ""; // Limpa as sugestões anteriores

        // Se houver texto digitado
        if (searchTerm.length > 0) {
            let suggestionsFound = false;

            items.forEach(item => {
                const text = item.textContent.toLowerCase();

                // Se o texto contiver o termo de busca
                if (text.includes(searchTerm)) {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.classList.add("suggestion-item");
                    suggestionItem.textContent = item.textContent;

                    // Adiciona o clique na sugestão
                    suggestionItem.addEventListener("click", function () {
                        searchInput.value = suggestionItem.textContent; // Preenche o input com a sugestão
                        filterItems(searchTerm); // Realiza a busca com o termo selecionado
                        suggestionsContainer.innerHTML = ""; // Limpa as sugestões
                    });

                    suggestionsContainer.appendChild(suggestionItem);
                    suggestionsFound = true;
                }
            });

            // Se não houver sugestões
            if (!suggestionsFound) {
                suggestionsContainer.innerHTML = "<div class='suggestion-item'>Nenhuma sugestão encontrada</div>";
            }

            showAllButton.style.display = "inline-block"; // Exibe o botão "Mostrar Tudo" se houver pesquisa
        } else {
            suggestionsContainer.innerHTML = ""; // Limpa as sugestões se o campo estiver vazio
            showAllButton.style.display = "none"; // Esconde o botão "Mostrar Tudo" se não houver pesquisa
        }
    });

    // Função de filtro para mostrar apenas itens correspondentes
    function filterItems(searchTerm) {
        const itemsToHide = document.querySelectorAll(".externa");
        const headings = document.querySelectorAll("h2"); // Seleciona todos os <h2>

        let encontrou = false;

        // Esconde os <h2> durante a pesquisa
        if (searchTerm !== "") {
            headings.forEach(h2 => h2.style.display = "none");
        } else {
            headings.forEach(h2 => h2.style.display = "block"); // Exibe novamente os <h2> quando não houver pesquisa
        }

        itemsToHide.forEach(item => {
            const text = item.querySelector(".texto")?.textContent.toLowerCase();

            // Remove o destaque e oculta o item
            item.classList.remove("highlight");
            item.classList.remove("hidden");

            if (text && text.includes(searchTerm)) {
                item.classList.add("highlight"); // Destaca
                item.classList.remove("hidden"); // Exibe
                encontrou = true;
            } else if (searchTerm === "") {
                // Quando a pesquisa estiver vazia, apenas exibe os itens sem aplicar o destaque
                item.classList.remove("highlight");
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden"); // Oculta
            }
        });

        if (!encontrou && searchTerm !== "") {
            alert("Nenhum resultado encontrado.");
        }
    }

    // Função para exibir todos os itens ao clicar no botão "Mostrar Tudo"
    showAllButton.addEventListener("click", function () {
        searchInput.value = ""; // Limpa o campo de pesquisa
        suggestionsContainer.innerHTML = ""; // Limpa as sugestões
        filterItems(""); // Exibe todos os itens
        showAllButton.style.display = "none"; // Esconde o botão "Mostrar Tudo"
    });

    // Evento para esconder sugestões ao clicar fora da caixa de pesquisa
    document.addEventListener("click", function (e) {
        // Verifica se o clique foi fora do campo de pesquisa e do container de sugestões
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.innerHTML = ""; // Limpa as sugestões
        }
    });
});