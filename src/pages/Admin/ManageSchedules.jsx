import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import useScheduleStore from '../../store/scheduleStore';
import ScheduleForm from '../admin/ScheduleForm';

export default function ManageSchedules() {
    const { schedules, films, prices, loading, error, fetchSchedules, fetchFilms, fetchPrices, addSchedule, updateSchedule, deleteSchedule, clearError } = useScheduleStore();
    const [showModal, setShowModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetchSchedules();
        fetchFilms();
        fetchPrices();
    }, []);

    useEffect(() => {
        if (error) {
            setNotification(error);
            setTimeout(() => {
                setNotification('');
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    const handleAdd = () => {
        setEditingSchedule(null);
        setShowModal(true);
    };

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingSchedule) {
                await updateSchedule(editingSchedule.id, formData);
                setNotification('Schedule updated successfully');
            } else {
                await addSchedule(formData);
                setNotification('Schedule added successfully');
            }
            setShowModal(false);
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            // Error handled by store
        }
    };

    const handleDelete = async (scheduleId) => {
        if (confirm('Are you sure you want to delete this schedule?')) {
            try {
                await deleteSchedule(scheduleId);
                setNotification('Schedule deleted successfully');
                setTimeout(() => setNotification(''), 3000);
            } catch (error) {
                // Error handled by store
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Schedules</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        <Plus className="w-4 h-4" />
                        Add Schedule
                    </button>
                </div>

                {/* Notification */}
                {notification && (
                    <div className="mb-4 p-3 bg-green-600 text-white rounded">
                        {notification}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading schedules...</div>
                    </div>
                )}

                {!loading && (
                    schedules.length > 0 ? (
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Movie</th>
                                        <th className="px-6 py-3 text-left">Studio</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Time</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map(schedule => (
                                        <tr key={schedule.id} className="border-b border-gray-700">
                                            <td className="px-6 py-4">{schedule.film?.title || 'N/A'}</td>
                                            <td className="px-6 py-4">Studio {schedule.studio_id}</td>
                                            <td className="px-6 py-4">{schedule.date}</td>
                                            <td className="px-6 py-4">{schedule.time}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(schedule)}
                                                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                                    >
                                                        <Edit className="w-3 h-3" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(schedule.id)}
                                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg mb-4">No schedules found</p>
                            <button
                                onClick={handleAdd}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                            >
                                Add First Schedule
                            </button>
                        </div>
                    )
                )}

                {/* Modal */}
                {showModal && (
                    <ScheduleForm
                        schedule={editingSchedule}
                        films={films}
                        prices={prices}
                        onSave={handleSave}
                        onCancel={() => setShowModal(false)}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}