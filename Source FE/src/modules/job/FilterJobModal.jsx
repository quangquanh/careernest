import { Button, Checkbox, Modal, Select } from 'flowbite-react';
import React, { useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import Slider from "react-slider";
import { FaDollarSign } from "react-icons/fa";

const levels = ["INTERN", "FRESHER", "JUNIOR", "MIDDLE", "SENIOR"];
const workType = ["Fulltime", "Part-time", "Remote"];

// use for Tablet, Mobile
const FilterJobModal = ({ isOpen = false, setOpenModal = () => { } }) => {
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedWorkType, setSelectedWorkType] = useState([]);
    const [salary, setSalary] = useState([500, 10000]);

    const toggleLevel = (level) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    const toggleWorkType = (level) => {
        setSelectedWorkType((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    return (
        <Modal show={isOpen} onClose={() => setOpenModal(false)}>
            <Modal.Header >Bộ lọc</Modal.Header>
            <Modal.Body className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <div className='font-semibold'>Cấp bậc</div>
                    <div className="flex flex-wrap gap-3">
                        {levels.map((level) => (
                            <label
                                key={level}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all 
                        ${selectedLevels.includes(level)
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                                    }`}
                                onClick={() => toggleLevel(level)}
                            >
                                <Checkbox
                                    checked={selectedLevels.includes(level)}
                                    onChange={() => toggleLevel(level)}
                                    className="hidden"
                                />
                                {level}
                                <AiOutlinePlus className="w-4 h-4" />
                            </label>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='font-semibold'>Hình thức làm việc</div>
                    <div className="flex flex-wrap gap-3">
                        {workType.map((level) => (
                            <label
                                key={level}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all 
                        ${selectedWorkType.includes(level)
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                                    }`}
                                onClick={() => toggleLevel(level)}
                            >
                                <Checkbox
                                    checked={selectedWorkType.includes(level)}
                                    onChange={() => toggleWorkType(level)}
                                    className="hidden"
                                />
                                {level}
                                <AiOutlinePlus className="w-4 h-4" />
                            </label>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='font-semibold'>Mức lương</div>
                    <div className="flex gap-3">
                        <span className="basis-1/3 text-gray-700 flex items-center gap-1">
                            <FaDollarSign className="text-blue-600" />
                            {salary[0].toLocaleString()}$ - {salary[1].toLocaleString()}$
                        </span>
                        <Slider
                            className="flex-auto h-2 bg-gray-300 rounded-lg relative"
                            min={500}
                            max={10000}
                            step={100}
                            value={salary}
                            onChange={setSalary}
                            renderTrack={(props, state) => (
                                <div
                                    {...props}
                                    className={`h-2 rounded-lg ${state.index === 1 ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                />
                            )}
                            renderThumb={(props) => (
                                <div
                                    {...props}
                                    className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer -top-1.5"
                                />
                            )}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='flex items-center justify-between'>
                <Button color="gray" onClick={() => setOpenModal(false)}>Hủy bỏ</Button>
                <Button onClick={() => setOpenModal(false)}>Áp dụng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterJobModal; 