import React, { useState } from 'react';
import axios from 'axios';
import './AudienceBuilder.css';

const AudienceBuilder = () => {
    const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);
    const [condition, setCondition] = useState('AND');
    const [audienceSize, setAudienceSize] = useState(null);
    const [audienceList, setAudienceList] = useState([]);

    const addRule = () => {
        setRules([...rules, { field: '', operator: '', value: '' }]);
    };

    const handleRuleChange = (index, e) => {
        const newRules = [...rules];
        newRules[index][e.target.name] = e.target.value;
        setRules(newRules);
    };

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
    };

    const checkAudienceSize = async () => {
        const response = await axios.post('https://crmbackend-2122.onrender.com/api/check_audience', { rules, condition });
        setAudienceSize(response.data.size);
        setAudienceList(response.data.audienceList);
    };


    const fields = ['total_spends', 'number_of_visits', 'last_visit_date'];

    return (
        <div  className="container">
            <h2>Build Audience</h2>
            {rules.map((rule, index) => (
                <div  className="rule" key={index}>
                    <select name="field" onChange={(e) => handleRuleChange(index, e)}>
                        <option value="">Select Field</option>
                        {fields.map(field => (
                            <option key={field} value={field}>{field}</option>
                        ))}
                    </select>
                    <select name="operator" onChange={(e) => handleRuleChange(index, e)}>
                        <option value="">Select Operation</option>
                        <option value="=">Equals</option>
                        <option value=">">Greater than</option>
                        <option value="<">Less than</option>
                        <option value=">=">Greater than or equal</option>
                        <option value="<=">Less than or equal</option>
                        <option value="!=">Not equal</option>
                    </select>
                    <input
                        name="value"
                        placeholder="Value"
                        onChange={(e) => handleRuleChange(index, e)}
                    />
                </div>
            ))}
            <button onClick={addRule}>Add Rule</button>
            <div className="condition">
                <label>
                    Condition:
                    <select value={condition} onChange={handleConditionChange}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                    </select>
                </label>
            </div>
            <button onClick={checkAudienceSize}>Check Audience Size</button>
            {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
            
            <hr />
          
         

            <h2>Audience List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {audienceList.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AudienceBuilder;
