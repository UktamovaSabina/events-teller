import { read, write } from '../utils/model.js';

const GET = (req, res) => {
    const speakers = read('speakers');

    res.status(200).json({
        status: 200,
        message: "success",
        data: speakers
    })
}

const POST = (req, res) => {
    try {
        const speakers = read('speakers');
        const { speaker_fullname, speaker_prof, phone_number } = req.body;

        const speaker = speakers.find(s => s.phone_number == phone_number);

        if(speaker){
            throw new Error("speaker number already exists...")
        }

        if(!phone_number.includes('+998')){
            throw new Error("phone number must begin with +998")
        }
        
        const newSpeaker = {
            speaker_id: speakers.at(-1)?.speaker_id + 1 || 1,
            speaker_fullname,
            speaker_prof,
            phone_number
        };
        speakers.push(newSpeaker);
        write("speakers", speakers);
        res.status(201).json({
            status: 201,
            message: "success",
            data: newSpeaker
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const PUT = (req, res) => {
    try {
        const speakers = read('speakers');
        const { id } = req.params;
        const { speaker_fullname, speaker_prof, phone_number } = req.body;

        const speaker = speakers.find(s => s.speaker_id == id);

        if(!speaker){
            throw new Error("speaker is not found...")
        }

        speaker.speaker_fullname = speaker_fullname || speaker.speaker_fullname;
        speaker.speaker_prof = speaker_prof || speaker.speaker_prof;
        speaker.phone_number = phone_number || speaker.phone_number;

        write("speakers", speakers);
        res.status(200).json({
            status: 200,
            message: "success",
            data: speaker
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const DELETE = (req, res) => {
    try {
        const speakers = read("speakers");
        const {id} = req.params;

        const speakerIndex = speakers.findIndex(s => s.speaker_id == id);

        if(speakerIndex == -1){
            throw new Error('speaker is not found...')
        }

        const deletedSpeaker = speakers.splice(speakerIndex, 1);
        write("speakers", speakers);

        res.status(200).json({
            status: 205,
            message:"successfully deleted",
            data: deletedSpeaker
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export default {
    GET,
    POST,
    PUT,
    DELETE
}