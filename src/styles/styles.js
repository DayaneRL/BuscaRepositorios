import styled, {keyframes, css} from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 60px auto;

  h1{
    font-size: 20px;
    display:flex;
    align-items: center;
    flex-direction:row;
    
    svg{
      margin-right: 10px;
    }
  }

  a{
    margin: 10px 0;
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
      color: #0D2636;
      text-decoration: none;
      float: right;
    }

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    div{
      display: flex;
      justify-content: center;
      align-items: center;

      h3{
        margin: 0 5px 0 10px;
      }
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  padding: 8px 7px;
  background: transparent;
  color: #0D2636;
  border: 0;
  outline:0;
  border-radius: 4px;
  margin-left: 7px;
`;

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items:center;
    height: 100vh;
`;


export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items:center;

    img{
        width: 120px;
        border-radius: 50%;
        margin: 20px 0;
    }

    h1{
        font-size: 26px;
        color: #0D2636;
    }

    p{
        margin-top: 5px;
        font-size: 15px;
        color:#000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const BackButton = styled(Link)`
    border:0;
    outline:0;
    background:transparent;

`;


export const ReposList = styled.ul`
    margin-top: 20px;
    paddint-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    h2{
        align-items: center;
        display: flex;
        flex-direction: column;
        margin: 12px 0 10px 0;
        color: #fff;
        background: #3f4676;
        border-radius: 5px;
        font-size: 19px;
        padding: 3px 7px;
    }

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
            margin-top: 12px;  
            border-top: 1px solid #ddd;
        }

        div{
            flex: 1;
            margin-left: 12px;

            p{
                margin-top: 8px;
                font-size: 12px;
                color #000;
            }
        }

        strong{
            font-size: 15px;

            a{
                text-decoration: none;
                color: #222;
                transform: 0.3s;

                &:hover{
                    color: #0071db;
                }
            }
        }
    }
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    div.member{
      display: block;
      align-items: self-start;
      margin: 0 0 0 12px;
    }
`;


export const PageAction = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin-top: 8px;

    button{
        outline:0;
        border:0;
        background: #222;
        color:#fff;
        padding: 5px 10px;
        border-radius: 4px;

        &:hover{
            background: #222222d1;
        }

        &:disabled{
            cursor: not-allowed;
            opacity:0.5;
        }
    }
`;

export const FilterList = styled.div`
    margin: 15px 0;

    button{
        outline:0;
        border:0;
        padding:8px;
        border-radius:4px;
        margin: 0 3px;

        &:hover{
            background:#0d26368c;
            color: #fff;
        }

        &:nth-child(${props => props.active + 1}){
            background: #0d2636;
            color: #fff;
        }
    }
`;