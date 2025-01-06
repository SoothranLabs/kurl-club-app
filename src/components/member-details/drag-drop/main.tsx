'use client';

import * as React from 'react';
import { MoreVertical, Plus, GripVertical } from 'lucide-react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ItemModal } from './editmodal';

interface Exercise {
  id: string;
  name: string;
  duration: string;
  reps?: string;
  completed?: boolean;
}

interface Meal {
  id: string;
  name: string;
  duration: string;
}

interface DayPlan {
  id: string;
  day: string;
  date: string;
  exercises: Exercise[];
  meals: Meal[];
}

export default function WorkoutTracker() {
  const [days, setDays] = React.useState<DayPlan[]>([
    {
      id: '1',
      day: 'Monday',
      date: '02/12/2024',
      exercises: [
        { id: 'e1', name: 'Warm-Up', duration: '10 mins' },
        { id: 'e2', name: 'Bench press', duration: '20 mins', reps: '3x10' },
        { id: 'e3', name: 'Squats', duration: '20 mins', reps: '3x12' },
        { id: 'e4', name: 'Pull-ups', duration: '15 mins', reps: '3x8' },
      ],
      meals: [
        { id: 'm1', name: 'Breakfast', duration: '20 mins' },
        { id: 'm2', name: 'Lunch', duration: '30 mins' },
        { id: 'm3', name: 'Dinner', duration: '40 mins' },
      ],
    },
    {
      id: '2',
      day: 'Tuesday',
      date: '02/13/2024',
      exercises: [
        { id: 'e5', name: 'Cardio', duration: '30 mins' },
        { id: 'e6', name: 'Deadlifts', duration: '25 mins', reps: '3x8' },
        { id: 'e7', name: 'Shoulder Press', duration: '20 mins', reps: '3x10' },
      ],
      meals: [
        { id: 'm4', name: 'Breakfast', duration: '20 mins' },
        { id: 'm5', name: 'Lunch', duration: '30 mins' },
        { id: 'm6', name: 'Dinner', duration: '35 mins' },
      ],
    },
    {
      id: '3',
      day: 'Wednesday',
      date: '02/14/2024',
      exercises: [
        { id: 'e8', name: 'Yoga', duration: '45 mins' },
        { id: 'e9', name: 'Bicep Curls', duration: '15 mins', reps: '3x12' },
        {
          id: 'e10',
          name: 'Tricep Extensions',
          duration: '15 mins',
          reps: '3x12',
        },
      ],
      meals: [
        { id: 'm7', name: 'Breakfast', duration: '25 mins' },
        { id: 'm8', name: 'Lunch', duration: '35 mins' },
        { id: 'm9', name: 'Dinner', duration: '30 mins' },
      ],
    },
    {
      id: '4',
      day: 'Thursday',
      date: '02/15/2024',
      exercises: [
        { id: 'e11', name: 'Leg Press', duration: '20 mins', reps: '3x12' },
        { id: 'e12', name: 'Lat Pulldowns', duration: '20 mins', reps: '3x10' },
        { id: 'e13', name: 'Planks', duration: '10 mins' },
      ],
      meals: [
        { id: 'm10', name: 'Breakfast', duration: '20 mins' },
        { id: 'm11', name: 'Lunch', duration: '30 mins' },
        { id: 'm12', name: 'Dinner', duration: '40 mins' },
      ],
    },
    {
      id: '5',
      day: 'Friday',
      date: '02/16/2024',
      exercises: [
        { id: 'e14', name: 'Running', duration: '30 mins' },
        { id: 'e15', name: 'Dips', duration: '15 mins', reps: '3x10' },
        { id: 'e16', name: 'Leg Raises', duration: '15 mins', reps: '3x15' },
      ],
      meals: [
        { id: 'm13', name: 'Breakfast', duration: '25 mins' },
        { id: 'm14', name: 'Lunch', duration: '35 mins' },
        { id: 'm15', name: 'Dinner', duration: '30 mins' },
      ],
    },
    {
      id: '6',
      day: 'Saturday',
      date: '02/17/2024',
      exercises: [
        { id: 'e17', name: 'Swimming', duration: '45 mins' },
        { id: 'e18', name: 'Push-ups', duration: '15 mins', reps: '3x20' },
        {
          id: 'e19',
          name: 'Russian Twists',
          duration: '10 mins',
          reps: '3x30',
        },
      ],
      meals: [
        { id: 'm16', name: 'Breakfast', duration: '30 mins' },
        { id: 'm17', name: 'Lunch', duration: '40 mins' },
        { id: 'm18', name: 'Dinner', duration: '35 mins' },
      ],
    },
    {
      id: '7',
      day: 'Sunday',
      date: '02/18/2024',
      exercises: [
        { id: 'e20', name: 'Rest Day', duration: 'All day' },
        { id: 'e21', name: 'Light Stretching', duration: '15 mins' },
      ],
      meals: [
        { id: 'm19', name: 'Brunch', duration: '45 mins' },
        { id: 'm20', name: 'Dinner', duration: '50 mins' },
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<'exercise' | 'meal'>(
    'exercise'
  );
  const [editingItem, setEditingItem] = React.useState<{
    dayId: string;
    itemId: string;
    type: 'exercise' | 'meal';
  } | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceDayIndex = days.findIndex((day) =>
      type === 'EXERCISE'
        ? day.id === source.droppableId
        : `${day.id}-meals` === source.droppableId
    );
    const destDayIndex = days.findIndex((day) =>
      type === 'EXERCISE'
        ? day.id === destination.droppableId
        : `${day.id}-meals` === destination.droppableId
    );

    const newDays = [...days];

    if (type === 'EXERCISE') {
      const sourceExercises = Array.from(newDays[sourceDayIndex].exercises);
      const [movedExercise] = sourceExercises.splice(source.index, 1);

      if (sourceDayIndex === destDayIndex) {
        sourceExercises.splice(destination.index, 0, movedExercise);
        newDays[sourceDayIndex] = {
          ...newDays[sourceDayIndex],
          exercises: sourceExercises,
        };
      } else {
        const destExercises = Array.from(newDays[destDayIndex].exercises);
        destExercises.splice(destination.index, 0, movedExercise);
        newDays[sourceDayIndex] = {
          ...newDays[sourceDayIndex],
          exercises: sourceExercises,
        };
        newDays[destDayIndex] = {
          ...newDays[destDayIndex],
          exercises: destExercises,
        };
      }
    } else if (type === 'MEAL') {
      const sourceMeals = Array.from(newDays[sourceDayIndex].meals);
      const [movedMeal] = sourceMeals.splice(source.index, 1);

      if (sourceDayIndex === destDayIndex) {
        sourceMeals.splice(destination.index, 0, movedMeal);
        newDays[sourceDayIndex] = {
          ...newDays[sourceDayIndex],
          meals: sourceMeals,
        };
      } else {
        const destMeals = Array.from(newDays[destDayIndex].meals);
        destMeals.splice(destination.index, 0, movedMeal);
        newDays[sourceDayIndex] = {
          ...newDays[sourceDayIndex],
          meals: sourceMeals,
        };
        newDays[destDayIndex] = {
          ...newDays[destDayIndex],
          meals: destMeals,
        };
      }
    }

    setDays(newDays);
  };

  const handleAddItem = (dayId: string, type: 'exercise' | 'meal') => {
    setModalType(type);
    setEditingItem({ dayId, itemId: '', type });
    setModalOpen(true);
  };

  const handleEditItem = (
    dayId: string,
    itemId: string,
    type: 'exercise' | 'meal'
  ) => {
    setModalType(type);
    setEditingItem({ dayId, itemId, type });
    setModalOpen(true);
  };

  const handleDeleteItem = (
    dayId: string,
    itemId: string,
    type: 'exercise' | 'meal'
  ) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id === dayId) {
          if (type === 'exercise') {
            return {
              ...day,
              exercises: day.exercises.filter((ex) => ex.id !== itemId),
            };
          } else {
            return {
              ...day,
              meals: day.meals.filter((meal) => meal.id !== itemId),
            };
          }
        }
        return day;
      })
    );
  };

  const handleSaveItem = (item: {
    name: string;
    duration: string;
    reps?: string;
  }) => {
    if (!editingItem) return;

    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id === editingItem.dayId) {
          if (editingItem.type === 'exercise') {
            if (editingItem.itemId) {
              // Editing existing exercise
              return {
                ...day,
                exercises: day.exercises.map((ex) =>
                  ex.id === editingItem.itemId ? { ...ex, ...item } : ex
                ),
              };
            } else {
              // Adding new exercise
              return {
                ...day,
                exercises: [
                  ...day.exercises,
                  { id: `e${Date.now()}`, ...item },
                ],
              };
            }
          } else {
            if (editingItem.itemId) {
              // Editing existing meal
              return {
                ...day,
                meals: day.meals.map((meal) =>
                  meal.id === editingItem.itemId ? { ...meal, ...item } : meal
                ),
              };
            } else {
              // Adding new meal
              return {
                ...day,
                meals: [...day.meals, { id: `m${Date.now()}`, ...item }],
              };
            }
          }
        }
        return day;
      })
    );

    setModalOpen(false);
    setEditingItem(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen  p-6 space-y-8 ">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Workout plans</h3>
            <Button variant="link" className="text-primary">
              View more
            </Button>
          </div>

          <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
            <div className="flex w-max space-x-4 p-4">
              {days.map((day) => (
                <div
                  key={day.id}
                  className="w-[300px] rounded-lg border border-border p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full bg-primary`} />
                      <span className="font-medium">{day.day}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {day.date}
                    </span>
                  </div>

                  <Droppable droppableId={day.id} type="EXERCISE">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {day.exercises.map((exercise, i) => (
                          <Draggable
                            key={exercise.id}
                            draggableId={exercise.id}
                            index={i}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="group relative rounded-md bg-muted p-3 hover:bg-accent"
                              >
                                <div
                                  className="flex justify-between items-center bg-secondary-blue-500"
                                  style={{
                                    width: '245px',
                                    height: '64px',
                                    borderRadius: '4px',
                                  }}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p
                                        className={`font-medium ${exercise.completed ? 'line-through' : ''}`}
                                      >
                                        {exercise.name}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {exercise.duration}
                                        {exercise.reps && `, ${exercise.reps}`}
                                      </p>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleEditItem(
                                            day.id,
                                            exercise.id,
                                            'exercise'
                                          )
                                        }
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleDeleteItem(
                                            day.id,
                                            exercise.id,
                                            'exercise'
                                          )
                                        }
                                        className="text-destructive"
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddItem(day.id, 'exercise')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Diet plans</h3>
            <Button variant="link" className="text-primary">
              View more
            </Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
            <div className="flex w-max space-x-4 p-4">
              {days.map((day) => (
                <div
                  key={day.id}
                  className="w-[300px] rounded-lg border border-border p-4 space-y-4"
                >
                  <h3 className="font-medium">{day.day}</h3>
                  <Droppable droppableId={`${day.id}-meals`} type="MEAL">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {day.meals.map((meal, i) => (
                          <Draggable
                            key={meal.id}
                            draggableId={meal.id}
                            index={i}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="group relative rounded-md bg-muted p-3 hover:bg-accent"
                              >
                                <div
                                  className="flex justify-between items-center bg-secondary-blue-500"
                                  style={{
                                    width: '245px',
                                    height: '64px',
                                    borderRadius: '4px',
                                  }}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{meal.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {meal.duration}
                                      </p>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleEditItem(
                                            day.id,
                                            meal.id,
                                            'meal'
                                          )
                                        }
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleDeleteItem(
                                            day.id,
                                            meal.id,
                                            'meal'
                                          )
                                        }
                                        className="text-destructive"
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddItem(day.id, 'meal')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Meal
                  </Button>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <ItemModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          type={modalType}
          initialData={
            editingItem
              ? modalType === 'exercise'
                ? days
                    .find((d) => d.id === editingItem.dayId)
                    ?.exercises.find((e) => e.id === editingItem.itemId)
                : days
                    .find((d) => d.id === editingItem.dayId)
                    ?.meals.find((m) => m.id === editingItem.itemId)
              : undefined
          }
        />
      </div>
    </DragDropContext>
  );
}
