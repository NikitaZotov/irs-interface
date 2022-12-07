/* eslint-disable */
import { Select, Option} from "./styled";

export const rates = [
    { key: 0.5, description: "Very slowly" },
    { key: 0.8, description: "Slowly" },
    { key: 1.0, description: "Normally" },
    { key: 1.2, description: "Fastly" },
    { key: 1.5, description: "Very fastly" },
];

export const VoiceRateSelector = ({ selected = 2, setSelected }: any) => {
    return (
        <Select
            value={selected}
            onChange={(e) => setSelected(parseInt(e.target.value))}
        >
            {rates.map((voice, index) => (
                <Option key={index} value={index}>
                    {voice.description} ({voice.key})
                </Option>
            ))}
        </Select>
    );
};
