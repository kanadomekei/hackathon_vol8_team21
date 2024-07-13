class ApiController < ApplicationController
  def genres
    @genres = CombinedData.all
    render json: @genres
  end
  def words
    @genres = CombinedData.all
    render json: @genres
  end
  def genreldwords
    @genres = CombinedData.where(genres_term: params[:genreld])
    render json: @genres
  end
  def questions
    @genres = CombinedData.all
    render json: @genres 
  end
  def genreldquestions
    @genres = CombinedData.where(genres_term: params[:genreld])
    render json: @genres
  end
end
