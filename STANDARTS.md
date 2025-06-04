## 📝 Padrões de Código

### Regras Gerais
- **Nomeação**: Use **inglês** para funções, variáveis e arquivos.
- **Rotas**: Devem ser escritas em **português** (prioritariamente).
### Componentes
- Todo componente deve ser nomeado com PascalCase

**Exemplos:**
- `Avatar.jsx` (nome do arquivo)
- `export function Avatar (){}` (nome do componente)
### Funções
- **Formato**: Use **camelCase** para funções.
- **Nomes**: Nomes simples e descritivos. Nomes longos são aceitáveis se forem claros.
- **Verbos**: Funções devem começar com um verbo, descrevendo a ação.
- **Funções Booleanas**: Funções que retornam valores booleanos devem começar com **is**, **has**, **can**, ou **should**.

**Exemplos**:
- `validateLogin()`
- `isUserActive()`
- `validateFormDataBeforeSubmission()`
- `processCheckoutAndCreateOrder()`
### Variáveis
- **Formato**: Use **camelCase** para variáveis.
- **Nomes**: Variáveis com nomes simples e descritivos.
- **Booleanos**: Variáveis booleanas devem começar com **is**, **has**, **can**.

**Exemplos**:
- `const isUserOnline = true;`
- `const counter;`
- `const totalPriceWithDiscountAndTaxes;`
### Classes CSS
Na grande maioria dos casos não será necessário criar um arquivo CSS, devido ao uso do Tailwind. Porém se houver a necessidade de um arquivo CSS separado, utilizar CSS Modules:

`NomeDoComponente.module.css` 

**Exemplos:**

    /Components
      Header.jsx
      Header.module.css
      Footer.jsx
      Footer.module.css
      Button.jsx
      Button.module.css

---
## 🧼 Clean Code

> “Qualquer um consegue escrever código que um computador entende. Bons programadores escrevem código que humanos entendem.” - **Martin Fowler**
### O Que Fazer
- **Consistência**: Mantenha o código consistente, siga as convenções e padrões definidos.
- **Organização**: Organize o código e os arquivos de forma clara.
- **Espaçamento**: Adicione **linhas em branco** para separar conceitos e seções do código.
- **Funções pequenas**: **Funções devem fazer apenas uma tarefa**. Se necessário, divida-as em funções menores.
- **Validação e Tratamento de Erros**: Sempre crie funções para validar dados e tratar erros antes de prosseguir com a lógica principal.
- **Variáveis significativas**: Evite "números mágicos", sempre associe valores a variáveis ou constantes.
### O Que NÃO Fazer
- **Repetir código**: Evite duplicação de lógica, use funções reutilizáveis.
- **Comentários excessivos**: Evite escrever comentários desnecessários; o código deve ser autoexplicativo.
- **"Números mágicos"**: Nunca use números diretamente no código, sempre associe-os a variáveis.
- **Retornar "null"**: Evite retornar `null` de funções; prefira valores padronizados.

---
## Boas Práticas React
Veja a documentação completa em [react.dev](https://react.dev/)

- **Componentes pequenos**: Quebre a UI em componentes reutilizáveis e com **uma única responsabilidade**.
- **Props e Estados**: Mantenha o estado e as props simples. Evite estados derivados de props.
- **Funções dentro de JSX**: Evite declarar funções diretamente dentro do JSX (return). Defina-as fora do componente (acima do return).
- **Funções em React**: Nomeie **event handlers** com o prefixo **handle** (ex: `handleClick`).
- **Evitar funções anônimas**: Sempre que possível, use funções nomeadas para **event handlers**.

```JSX
// Errado 
export function MyComponent() {
  return (
    <div>
      <button onClick={() => alert('Button clicked!')}>Click me</button>
    </div>
  );
};

// Certo
export function MyComponent() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```
- **Hooks**: Use **useEffect**, **useState** corretamente. Evite manipular o DOM diretamente ou criar efeitos complexos dentro das funções de renderização.