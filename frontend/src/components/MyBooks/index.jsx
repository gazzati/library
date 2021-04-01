import React, {useEffect, useState} from "react"
import {
    Button,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core"
import clsx from "clsx"
import {baseUrl} from "../../App";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        marginTop: 80,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    table: {
        minWidth: 650
    },
}))

const MyBooks = ({open, userId}) => {
    const classes = useStyles()
    const [books, setBooks] = useState(false)

    useEffect(() => {
        getAllBooks()
    }, [])

    const getAllBooks = async () => {
        const response = await fetch(baseUrl + 'books/my', {
            method: 'POST',
            body: JSON.stringify({userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const userData = await response.json()
        setBooks(userData.data)
    }

    const deleteBook = async (bookId) => {
        const response = await fetch(baseUrl + 'books/remove', {
            method: 'DELETE',
            body: JSON.stringify({userId, bookId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await response.json()
        alert('Книга удалена')
        getAllBooks()
    }

    return (
        <Grid container >
            <Grid className={clsx(classes.content, {[classes.contentShift]: open})}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell>Автор</TableCell>
                                <TableCell>Дата публикации</TableCell>
                                <TableCell>Ссылка</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books && books.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.publisher}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>
                                        {row.url &&
                                            <a href={row.url}>Ссылка</a>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => deleteBook(row._id)}>
                                            Удалить
                                        </Button>
                                    </TableCell>
                                </TableRow >
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default MyBooks
