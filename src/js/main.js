document.querySelectorAll('.button').forEach(button => {

    let div = document.createElement('div'),
        letters = button.textContent.trim().split('');

    function elements(letter, index, array) {

        let element = document.createElement('span'),
            part = (index >= array.length / 2) ? -1 : 1,
            position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
            move = position / (array.length / 2),
            rotate = 1 - move;

        element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
        element.style.setProperty('--move', move);
        element.style.setProperty('--rotate', rotate);
        element.style.setProperty('--part', part);

        div.appendChild(element);

    }

    letters.forEach(elements);

    button.innerHTML = div.outerHTML;

    button.addEventListener('mouseenter', e => {
        if(!button.classList.contains('out')) {
            button.classList.add('in');
        }
    });

    button.addEventListener('mouseleave', e => {
        if(button.classList.contains('in')) {
            button.classList.add('out');
            setTimeout(() => button.classList.remove('in', 'out'), 950);
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("b-start");
    const submitButton = document.querySelector(".b-submit");
    const calcButton = document.querySelector(".b-calc");
    const insertDadosSection = document.getElementById("insertDados");
    const insertNotasSection = document.getElementById("insertNotas");
    const tableSection = document.getElementById("table");
    const homepageSection = document.getElementById("homepage");

    calcButton.addEventListener("click", () => {
        insertNotasSection.classList.add("d-none");
        tableSection.classList.remove("d-none");
    });

    startButton.addEventListener("click", () => {
        homepageSection.classList.add("d-none");
        insertDadosSection.classList.remove("d-none");
    });

    submitButton.addEventListener("click", () => {
        insertDadosSection.classList.add("d-none");
        insertNotasSection.classList.remove("d-none");
    });

    const links = {
        tablelink: tableSection,
        insertlink: insertDadosSection,
        homelink: homepageSection
    };

    Object.keys(links).forEach(linkId => {
        document.querySelector(`#${linkId}`).addEventListener("click", (e) => {
            e.preventDefault();
            Object.values(links).forEach(section => section.classList.add("d-none"));
            links[linkId].classList.remove("d-none");
        });
    });
});

// FUNÇÃO PARA CALCULAR A MÉDIA

document.getElementById('b-start').addEventListener('click', () => {
    document.getElementById('homepage').classList.add('d-none');
    document.getElementById('insertDados').classList.remove('d-none');

    document.querySelector('.b-submit').addEventListener('click', () => {
        const aluno = document.getElementById('aluno').value.trim();
        const xNotas = parseInt(document.getElementById('xNotas').value);

        if (aluno && xNotas > 0) {
            document.getElementById('insertDados').classList.add('d-none');
            document.getElementById('insertNotas').classList.remove('d-none');

            const notasContainer = document.getElementById('insertNotas');
            notasContainer.innerHTML = `
                <h2 class="text-center text-p">INSIRA AS NOTAS DO ALUNO</h2>
                ${Array.from({ length: xNotas }, (_, i) => `
                    <div class="mb-3 col-6">
                        <label for="nota${i + 1}" class="form-label">Nota ${i + 1}</label>
                        <input type="number" class="form-control nota" id="nota${i + 1}" placeholder="Nota ${i + 1}" min="0" max="10" required>
                    </div>
                `).join('')}
                <button type="submit" id="b-calculo" class="btn btn-primary b-calc">CALCULAR NOTAS</button>
                <div class="col-6">
                    <img src="./dist/images/1aluno.png" alt="1aluno" class="w-100">
                </div>
            `;

            document.getElementById('b-calculo').addEventListener('click', () => {
                const notas = Array.from(document.querySelectorAll('.nota')).map(input => parseFloat(input.value));
                if (notas.some(isNaN) || notas.some(nota => nota < 0 || nota > 10)) {
                    alert('Por favor, insira notas válidas entre 0 e 10.');
                    return;
                }

                const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
                const status = media >= 6 ? 'APROVADO' : 'REPROVADO';

                const tableBody = document.querySelector('#table tbody');
                const newRow = `
                    <tr>
                        <th scope="row">${tableBody.children.length + 1}</th>
                        <td>${aluno}</td>
                        <td>${media.toFixed(2)}</td>
                        <td>${status}</td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', newRow);

                document.getElementById('insertNotas').classList.add('d-none');
                document.getElementById('table').classList.remove('d-none');
            });
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
        document.getElementById('homepage').classList.add('d-none');
        document.getElementById('insertDados').classList.remove('d-none');
    });



