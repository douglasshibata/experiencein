import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    titleMain: {
        color: "#092332",
        textAlign: "center",
    },
    pos: {
        marginBottom: 12,
    },
    error: {
        color: 'red',
        marginBottom: '-1px'
    },
});
function Perfil() {
    const [perfis, setPerfis] = useState([]);
    const [error, setError] = useState('');
    const classes = useStyles();

    useEffect(() => {
        async function getPerfis() {
            try {
                const response = await api.get('perfil/')
                setPerfis(response.data)
                console.log(response.data);
            } catch (error) {
                setError("Erro ao carregar os dados")
                console.log(error.data);
            }
        }
        getPerfis()
    }, )
    const nome = localStorage.getItem('nome')
    return (
        <>
            <Header title={nome} />
            <Container>
                <h1 className={classes.titleMain}>Meu Perfil e Minhas conexões</h1>
                {error && <p id='error'>{error}</p>}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card className={classes.root} key={perfis.id}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {perfis.id}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {perfis.nome}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {perfis.email}
                                </Typography>
                                <Typography variant="body2" component="p">
                                {perfis.nome_empresa}  
                                </Typography>
                                <Typography variant="h5" component="h2">
                                   Contatos:
                                </Typography>
                                {//perfis.contatos.lenght ==0?<></>:
                                    perfis.contatos.map(item=>(
                                         <Typography key={item.id} className={classes.pos} color="textSecondary">
                                           Nome: {item.nome}
                                           <br/>
                                           Email: {item.email}
                                         </Typography>
                                    ))}
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

            </Container>
            <Footer title="Rede Social Experiencein" description="Desenvolvido por Mônica Oliveira e Douglas Shibata" />
        </>
    );
}

export default withRouter(Perfil);