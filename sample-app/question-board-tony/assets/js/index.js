const question_board = document.getElementById('question_board');

function fakeApi(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            fetch(data)
                .then(res => res.json())
                .then(data => resolve(data))
        }, 1000)
    })
}

async function fetchQuestions() {
    const questions = await fakeApi('assets/js/dataQuestion.json');
    return questions;
}

async function fetchSubmissions() {
    const submissions = await fakeApi('assets/js/dataSubmissions.json');
    return submissions;
}

function fetchQuestionsbyCategory(dataSource = []) {
    const resuls = dataSource.reduce((acc, curr) => {
        if(!acc[curr.category]) {
            acc[curr.category] = [];
        }
        acc[curr.category].push(curr)
        return acc;
    }, {});

    return resuls;
}

function getSubmissionById(dataSource = []) {
    return dataSource.reduce((acc, curr) => {
        acc[curr.questionId] = curr.status;
        return acc;
    }, {})
}

function createCategory({
    title, 
    questions,
    submissions
}) {
    const columnDiv = document.createElement('div');
    columnDiv.setAttribute('class', 'column');

    const categoryH2 = document.createElement('h2');
    categoryH2.innerHTML = title;
    columnDiv.appendChild(categoryH2);
    
    questions.forEach(question => {
        const boardsDiv = document.createElement('div');
        boardsDiv.setAttribute('class', 'boards');
    
        const questionDiv = document.createElement('div');
        questionDiv.setAttribute('class', 'question');
    
        const questionStatusDiv = document.createElement('div');
        // const submissionItem = submissions.find(submission => submission.questionId === question.id);
        // questionStatusDiv.setAttribute('class', `question__status question__status--${submissionItem ? submissionItem.status.toLowerCase() : 'none'}`);

        // hash object
        questionStatusDiv.setAttribute('class', `question__status question__status--${submissions[question.id]?.toLowerCase() || 'none' }`);
    
        const questionTitleDiv = document.createElement('div');
        questionTitleDiv.setAttribute('class', 'question__title');
        questionTitleDiv.innerHTML = question.name;
    
        questionDiv.appendChild(questionStatusDiv);
        questionDiv.appendChild(questionTitleDiv);
        
        boardsDiv.appendChild(questionDiv);
    
        columnDiv.appendChild(boardsDiv);
    })

    return columnDiv;
}

async function renderCategories() {
    const [questions, submissions] = await Promise.all([fetchQuestions(), fetchSubmissions()])
    const questionByCategory = fetchQuestionsbyCategory(questions);
    const submissionById = getSubmissionById(submissions);

    for(const [key, value] of Object.entries(questionByCategory)) {
        const categoryElement = createCategory({
            title: key,
            questions: value,
            submissions: submissionById
        });
        question_board.appendChild(categoryElement);
    }
}

renderCategories();