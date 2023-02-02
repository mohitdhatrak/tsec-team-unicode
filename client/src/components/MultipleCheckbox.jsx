import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { ammenities, rules, transport } from "../utils/listingFormOptions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function MultipleCheckbox(props) {
    const { purpose, label } = props;

    const [selectedOption, setSelectedOption] = useState([]);

    let arr;

    switch (purpose) {
        case "rules":
            arr = rules;
            break;

        case "transport":
            arr = transport;
            break;

        case "ammenities":
            arr = ammenities;
            break;

        default:
            break;
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedOption(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl required margin="normal" fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    // id="demo-multiple-checkbox"
                    id="select"
                    label="select"
                    name={purpose}
                    multiple
                    value={selectedOption}
                    onChange={handleChange}
                    input={<OutlinedInput label="select" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {arr.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox
                                checked={selectedOption.indexOf(option) > -1}
                            />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
