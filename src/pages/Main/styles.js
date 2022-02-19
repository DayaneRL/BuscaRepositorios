import styled, {keyframes, css} from 'styled-components';

export const Div = styled.div`
  margin-top:80px;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 10px auto 80px auto;

  h1{
    font-size: 20px;
    display:flex;
    align-items: center;
    flex-direction:row;
    
    svg{
      margin-right: 10px;
    }
  }

`;

export const Container1 = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  margin: 10px auto;

  a{
    font-size: 18px;
    display:flex;
    flex-direction:row;
    align-items: flex-start;
    color: #000000f2;
    text-decoration: none;
    border-radius: 3px;
    max-width: 100%;
    margin:0 0 10px 0;
    padding: 10px 10px;
    font-weight: bold;
    
    &:hover{
      background:#0d2636fa;
      color: #fff;
    }
    
    svg{
      margin-right: 10px;
    }
  }

  @media (max-width: 680px)
  {
    a{
      max-width: 700px;
      margin:0 0 10px 0;
    }
  }

`;

export const Form = styled.form`
  margin-top: 30px;
  display:flex;
  flex-direction: row;

  input{
    flex:1;
    border: 1px solid ${props => (props.error ? '#FF0000':'#DDD')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }

`;

//Criando animcação do botao
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background:#000000f2;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    background:#0d2636fa;
    color: #fff;
  }

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading &&
    css`
      svg{
        animation: ${animate} 2s linear infinite;
      }
    `
  }

`;

export const List = styled.ul`
  list-style:none;
  margin-top:20px;

  li{
    padding: 15px 0;
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;

    & + li{
      border-top: 1px solid #ddd;
    }

    a{
      color: #222;
      text-decoration: none;

      svg{
        vertical-align: sub;
      }
      span{
        margin-left: 10px;
        font-size:15px;
      }
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  padding: 8px 7px;
  background: transparent;
  color: #222;
  border: 0;
  outline:0;
  border-radius: 4px;
`;

