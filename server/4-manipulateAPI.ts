import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import cors from 'cors';

const app = express();
const port = 3001;
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

interface User {
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
    };
    email: string;
    dob: {
        age: number;
    };
    phone: string;
    cell: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

interface TransformedUser {
    name: string;
    location: string;
    email: string;
    age: number;
    phone: string;
    cell: string;
    picture: string[];
}

app.get('/fetch-data/:results/:page', async (req: Request, res: Response) => {
    try {
        const { results, page } = req.params; // dynamically change results and page from client
        const url = `https://randomuser.me/api?results=${results}&page=${page}&gender=female`;

        const response: AxiosResponse<{ results: User[] }> = await axios.get(url);
        const userData = response.data.results;

        const transformedData: TransformedUser[] = userData.map((user) => ({
            name: `${user.name.title}, ${user.name.first} ${user.name.last}`,
            location: `${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
            email: user.email,
            age: user.dob.age,
            phone: user.phone,
            cell: user.cell,
            picture: [user.picture.large, user.picture.medium, user.picture.thumbnail],
        }));

        res.json({ data: transformedData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
