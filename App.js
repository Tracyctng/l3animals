import { StatusBar } from 'expo-status-bar'; //control over the appearance & behavior of the device's status bar
import React, { useState } from 'react'; //allows components to store and update data that can change over time
import {View, Image, Text, Alert, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'; //allows functions such as images, text etc. to display in the devices
import { Picker } from '@react-native-picker/picker'; //allow users to select an option

// Reusable Question component
const Question = ({ image, options, selectedValue, onValueChange, questionText }) => {
    return (
        <View style={styles.questionContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.questionText}>{questionText}</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={styles.picker}
            >
                <Picker.Item label="Select an item..." value="" />
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                ))}
            </Picker>
        </View>
    );
};

// Setting correct answers and conditions
export default function App() {
    const [ans, setAns] = useState({ q1: '', q2: '', q3: '' });

    // Set the correct answers for each qn, qn1 answer is 'rabbit' and so on...
    const correctAns = {
        q1: 'Rabbit',
        q2: 'Bear',
        q3: 'Chick',
    };

    // When a point is scored, for e.g., if q1 is answered correctly, then 1 point is scored
    const handleSubmit = () => {
        let score = 0;
        if (ans.q1 === correctAns.q1) score++;
        if (ans.q2 === correctAns.q2) score++;
        if (ans.q3 === correctAns.q3) score++;

        // msg format once submit button is clicked
        let msg = `You have ${score} correct answer${score !== 1 ? 's' : ''}!`;

        if (score === 3) msg += '\nExcellent work!';
        else if (score === 2) msg += '\nGood job!';
        else msg += '\nYou can do better next time.';

        Alert.alert('Quiz Results', msg, [{ text: 'OK' }]);
    };

    // allows users to view the quiz content such as images, questions, options and their selected/updated answers
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Animal Quiz</Text>

            <Question
                image="https://cdn-fastly.petguide.com/media/2022/02/16/8214275/florida-white-rabbit.jpg?size=650x832&nocrop=1"
                questionText="What animal is this?"
                options={['Rabbit', 'Bear', 'Chick']}
                selectedValue={ans.q1}
                onValueChange={(val) => setAns({ ...ans, q1: val })}
            />

            <Question
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9C9O6_kgBZ9bYPSDqMTazL978De3xA6FPgw&s"
                questionText="What animal is this?"
                options={['Rabbit', 'Bear', 'Chick']}
                selectedValue={ans.q2}
                onValueChange={(val) => setAns({ ...ans, q2: val })}
            />

            <Question
                image="https://image.petmd.com/files/styles/863x625/public/2023-11/Chick.jpg"
                questionText="What animal is this?"
                options={['Rabbit', 'Bear', 'Chick']}
                selectedValue={ans.q3}
                onValueChange={(val) => setAns({ ...ans, q3: val })}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </ScrollView>
    );
}

// adjust the size of the text and its alignment
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink', //background color set to pink
        padding: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 20,
    },
    questionContainer: {
        marginBottom: 30,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    questionText: {
        fontSize: 16,
        marginVertical: 10,
    },
    picker: {
        backgroundColor: '#f2f2f2', //picker color set to white
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#4CAF50', //submit button set to green
        marginVertical: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});