FROM ruby:3.2

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo

WORKDIR /app
RUN mkdir -p tmp/pids
RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client
COPY backend/Gemfile /app/Gemfile
COPY backend/Gemfile.lock /app/Gemfile.lock
RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]