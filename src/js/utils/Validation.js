class Validation {

    static getOrderConstraints() {
        return {
            clientName: {
                presence: {
                    allowEmpty: false,
                    message: "^Пожалуйста, заполните это поле."
                },
                format: {
                    pattern: /[А-Яа-я-ёЁ]*/,
                    message: "^Имя может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Имя должно состоять максимум из 30 символов и минимум из 2."
                }
            },
            clientPhone: {
                presence: {
                    allowEmpty: false,
                    message: "^Это поле обязательно для заполнения."
                },
                format: {
                    pattern: /^\+?(\d+(\#\d+)?){1,30}/,
                    message: "^Номер телефона не может превышать 30 символов и должен состоять только из цифр."
                }
            },
            carFeedPoint: {
                presence: {
                    allowEmpty: false,
                    message: "^Пожалуйста, заполните это поле."
                },
                address: {
                    message: "^Извините, мы не можем найти указанный адрес. Попробуйте снова."
                }
            },
            destination: {
                presence: {
                    allowEmpty: false,
                    message: "^Пожалуйста, заполните это поле."
                },
                address: {
                    message: "^Извините, мы не можем найти указанный адрес. Попробуйте снова."
                }
            },
            rate: {
                presence: {
                    allowEmpty: false,
                    message: "^Пожалуйста, заполните поле."
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    message: "^Допустимы только положительные числа."
                }
            }
        };
    }

    static getCarConstraints() {
        return {
            stateCarNumber: {
                presence: {
                    message: "^Пожалуйста, заполните поле."
                },
                length: {
                    minimum: 5,
                    maximun: 15,
                    message: "^Номер автомобиля должен состоять максимум из 20 символов и минимум из 5."
                }
            },
            brand: {
                presence: {
                    message: "^Пожалуйста, заполните поле."
                },
                length: {
                    minimum: 3,
                    maximum: 50,
                    message: "^Марка автомобиля должна состоять максимум из 20 символов и минимум из 2."
                }
            },
            gasolineConsumptionRatio: {
                presence: {
                    message: "^Пожалуйста, заполните поле."
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    message: "^Допустимы только положительные числа не больше 12.00."
                }
            },
            description: {
                length: {
                    maximum: 255,
                    message: "^Количество символов не должно быть больше 255."
                }
            }
        };
    }

    static getAddDriverConstraints() {
        return {
            name: {
                format: {
                    pattern: /[А-Яа-я-ёЁ]+/,
                    message: "^Пожалуйста, заполните это поле. Имя может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Имя должно состоять максимум из 30 символов и минимум из 2."
                }
            },
            surname: {
                format: {
                    pattern: /[А-Яа-я-ёЁ]+/,
                    message: "^Пожалуйста, заполните это поле. Фамилия может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Фамилия должна состоять максимум из 30 символов и минимум из 2."
                }
            },
            phone: {
                format: {
                    pattern: /^\+?(\d+(\#\d+)?){1,30}/,
                    message: "^Это поле обязательно для заполнения. Номер телефона не может превышать 30 символов и должен состоять только из цифр."
                }
            },
            description: {
                length: {
                    maximum: 255,
                    message: "^Количество символов не должно быть больше 255."
                }
            }
        };
    }

    static getEditDriverConstraints() {
        return {
            name: {
                format: {
                    pattern: /[А-Яа-я-ёЁ]+/,
                    message: "^Пожалуйста, заполните это поле. Имя может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Имя должно состоять максимум из 30 символов и минимум из 2."
                }
            },
            surname: {
                format: {
                    pattern: /[А-Яа-я-ёЁ]+/,
                    message: "^Пожалуйста, заполните это поле. Фамилия может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Фамилия должна состоять максимум из 30 символов и минимум из 2."
                }
            },
            phone: {
                format: {
                    pattern: /^\+?(\d+(\#\d+)?){1,30}/,
                    message: "^Это поле обязательно для заполнения. Номер телефона не может превышать 30 символов и должен состоять только из цифр."
                }
            },
            currentLocation: {
                length: {
                    maximum: 50,
                    message: "^Адрес может состоять максимум из 50 символов"
                }
            },
            description: {
                length: {
                    maximum: 255,
                    message: "^Количество символов не должно быть больше 255."
                }
            }
        };
    }
}