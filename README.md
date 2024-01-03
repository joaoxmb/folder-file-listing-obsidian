# Listagem de arquivos da pasta
Este Script tem como objetivo listar todos os arquivos da pasta na qual ele foi chamado.

## Funcionamento

> Este script só funcionará corretamente se aplicado em *Notas da Pasta* - criados pelo plugin [Folder notes](https://github.com/LostPaul/obsidian-folder-notes)

O funcionamento parte de um princípio simples - Listar todas as notas, pastas e arquivos de uma pasta especifica - fazemos isso utilizando o plugin [Dataview](https://github.com/blacksmithgu/obsidian-dataview) que nos permite capturar arquivos e aplica-los com JavaScript.

## Todo
- [x] Diminuir o tamanho do titulo
- [x] Bloquear Propriedade Keys
- [x] Trocar cores das propriedades
- [x] Fazer os links funcionarem
- [ ] Na hora de mostrar o link ele esta juntado as listas que contem o link em apenas uma string, dessa maneira o que antes eram vários links vira apenas um. Localizar e corrigir este erro
- [ ] A ordenação ainda não está funcionando por ordem, além de que agora senti a necessidade de ordenar os arquivos que contém propriedades antes dos que não possuem, mantendo a sua ordenação das pastas primeiro do que arquivos.

## Dependências
Plugins do Obsidian que são necessários para que o Script funcione corretamente
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Folder notes](https://github.com/LostPaul/obsidian-folder-notes)
- [Iconize](https://github.com/FlorianWoelki/obsidian-iconize)