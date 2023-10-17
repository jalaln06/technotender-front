export enum EquipmentType {
    Crane = 'Crane',
    Shack = 'Shack',
    Excavator = 'Excavator',
    BackhoeLoader = 'BackhoeLoader',
    DumpTruck = 'DumpTruck',
    MiniLoader = 'MiniLoader',
    ManipulatorTruck = 'ManipulatorTruck',
    FlatbedTruck = 'FlatbedTruck',
    ConcretePump = 'ConcretePump',
    ConcreteMixer = 'ConcreteMixer',
    AerialPlatform = 'AerialPlatform',
    UtilityVehicle = 'UtilityVehicle',
}

export const EquipmentSelectOptions = [
    {
        label: 'Кран',
        value: EquipmentType.Crane,
    },
    {
        label: 'Шаланда',
        value: EquipmentType.Shack,
    },
    {
        label: 'Экскаватор',
        value: EquipmentType.Excavator,
    },
    {
        label: 'Экскаватор-погрузчик',
        value: EquipmentType.BackhoeLoader,
    },
    {
        label: 'Самосвал',
        value: EquipmentType.DumpTruck,
    },
    {
        label: 'Мини-погрузчик',
        value: EquipmentType.MiniLoader,
    },
    {
        label: 'Манипулятор',
        value: EquipmentType.ManipulatorTruck,
    },
    {
        label: 'Бортовой автомобиль с манипулятором',
        value: EquipmentType.FlatbedTruck,
    },
    {
        label: 'Бетононасос',
        value: EquipmentType.ConcretePump,
    },
    {
        label: 'Бетоносмеситель',
        value: EquipmentType.ConcreteMixer,
    },
    {
        label: 'Автовышка',
        value: EquipmentType.AerialPlatform,
    },
    {
        label: 'Коммунальная техника',
        value: EquipmentType.UtilityVehicle,
    },
];
