module.exports = function(grunt) {
    // Configuração das tarefas do Grunt
    grunt.initConfig({
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            dist: {
                expand: true,
                cwd: 'src/js', //Dirtório dos meus arquivos JavaScript originais
                src: ['*.js'], //Padrão onde os arquivos transpilados serão salvos
                dest: 'dist/js', // Diretorio onde os arquivos transpilados serão salvos
                ext: '.js' // manter a extensão .js
            }
        },

        sass: {
            options: {
                implementation: require('sass'),
                sourceMap: true,
                includePaths: ['node_modules'] // Importante para encontrar o Bootstrap
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/styles', // Diretório dos seus arquivos SCSS
                    src: ['*.scss'], // Padrão para encontrar os arquivos SCSS
                    dest: 'dist/css', // Diretório onde os arquivos CSS compilados serão salvos
                    ext: '.css' // Substituir a extensão .scss por .css
                }]
            }
        },

            watch: {
                options: {
                livereload: true, // Opcional: recarregar o navegador automaticamente (requer extensão no navegador)
                },
                scripts: {
                files: ['src/js/**/*.js'], // Arquivos JavaScript para observar
                tasks: ['babel'], // Tarefas a serem executadas quando os arquivos JavaScript mudarem
                options: {
                    spawn: false, // Otimiza a velocidade para tarefas simples
                },
                },
                styles: {
                files: ['src/styles/**/*.scss'], // Arquivos SCSS para observar
                tasks: ['sass'], // Tarefas a serem executadas quando os arquivos SCSS mudarem
                options: {
                    spawn: false,
                },
                },
            },

            imagemin: {
                dynamic: {                         // Opção para minificar dinamicamente vários arquivos
                    files: [{
                    expand: true,                  // Ativar a expansão para mapeamento dinâmico de arquivos
                    cwd: 'src/images/',             // Diretório base dos meus arquivos de imagem originais
                    src: ['**/*.{png,jpg,gif,svg}'], // Padrão para encontrar todos os arquivos PNG, JPG, GIF e SVG
                    dest: 'dist/images/'            // Diretório de destino para as imagens minificadas
                    }]
                }
            },
    });


    // Carregar o plugin do Babel
    grunt.loadNpmTasks ('grunt-babel');

    // Carrega o plugin do sass
    grunt.loadNpmTasks('grunt-sass');

    // Carregar o plugin imagemin
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Carrega o plugin watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Definir a tarefa padrão (opcional)
    grunt.registerTask('default', ['babel', 'sass','imagemin', 'watch']);
};
