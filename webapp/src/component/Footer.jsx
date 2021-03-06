import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © OUALI YANNICK  ---  '}
            <Link
                color="inherit"
                href="https://github.com/metasmash/training-spring-boot"
            >
                Lien vers le github
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: '#18F58C',
    },
}))

export default function StickyFooter() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Container
                component="main"
                className={classes.main}
                maxWidth="sm"
            />
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Site internet sponsorisé par la MIAGE
                    </Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    )
}
