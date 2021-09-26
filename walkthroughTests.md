# Passo a passo para criar testes e rodar os existentes.

1. Rodar npm install para instalar as dependências;
1. Subir um container do docker com a imagem do postgres (***opcional*** caso você não tenha o postgres instalado na sua máquina)
1. Criar um banco com as seguintes características

```
  nome do banco => me_empresta
  senha => docker

```

4. Criar um banco de testes com as seguintes características

```
  nome do banco => me_empresta_test
  senha => docker

```

5. Para rodar os teste usar o comando ```npm run test```


#### Observações

Caso precise alterar o nome do banco ou a senha do banco, mudar o arquivo .env
