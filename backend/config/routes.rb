Rails.application.routes.draw do
  resources :posts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/api/genres" => "api#genres"
  get "/api/words" => "api#words"
  get "/api/genres/:genreld/words" => "api#genreldwords"
  get "/api/questions" => "api#questions"
  get "/api/questions/:id" => "api#genreldquestions"
end
